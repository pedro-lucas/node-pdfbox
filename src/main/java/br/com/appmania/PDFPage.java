package br.com.appmania;

import java.awt.Rectangle;
import java.awt.geom.Rectangle2D;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.List;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.interactive.action.PDAction;
import org.apache.pdfbox.pdmodel.interactive.action.PDActionURI;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotation;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationLink;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.apache.pdfbox.text.PDFTextStripperByArea;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class PDFPage {

    private PDPage page;
    private int pageIndex;
    private PDDocument document;


    public PDFPage(PDDocument document, int index) {
        this.document = document;
        this.pageIndex = index;
        this.page = document.getPage(index);
    }

    public PDRectangle getRect() {
        return page.getCropBox();
    }

    public void extract(String savePath) throws IOException {
        PDDocument doc = new PDDocument();
        doc.addPage(page);
        doc.save(savePath);
        doc.close();
    }

    public float getAspectFillScale(int width, int height) {

        PDRectangle rect = this.getRect();

        float cWidth = rect.getWidth();
        float cHeight = rect.getHeight();

        return Math.max((float) width / cWidth, (float) height / cHeight);
    }

    public float getAspectFitScale(int width, int height) {

        PDRectangle rect = this.getRect();

        float cWidth = rect.getWidth();
        float cHeight = rect.getHeight();

        return Math.min((float) width / cWidth, (float) height / cHeight);
    }

    public PDFPageImage getImage() throws IOException {
        return getImage(1.0f);
    }

    public PDFPageImage getImage(String format) throws IOException {
        return getImage(1.0f, format);
    }

    public PDFPageImage getImage(double scale) throws IOException {
        return this.getImage((float)scale, "jpg");
    }

    public PDFPageImage getImage(double scale, String format) throws IOException {
        PDFRenderer render = new PDFRenderer(document);
        //Scale to 2x - There is a bug on PDFBOX render 1x
        BufferedImage image = render.renderImage(pageIndex, (float)scale * 2, format.equals("jpg") ? ImageType.RGB : ImageType.ARGB);
        return new PDFPageImage(image).scale(0.5f);
    }

    public PDFPageImage getImage(int width, int height) throws IOException {
        return this.getImage(width, height, "jpg");
    }

    public PDFPageImage getImage(int width, int height, String format) throws IOException {
        float scale = this.getAspectFillScale(width, height);
        PDFPageImage image = this.getImage(scale, format);

        int x = (int)((image.getImage().getWidth() - width) / 2.0f);
        int y = (int)((image.getImage().getHeight() - height) / 2.0f);

        return image.crop(new Rectangle(x, y, width, height));
    }

    public String getText() throws IOException {	
        PDFTextStripper textStripper = new PDFTextStripper();
        textStripper.setStartPage(pageIndex+1);
        textStripper.setEndPage(pageIndex+1);
        textStripper.setLineSeparator("\n");
        return textStripper.getText(document);
    }

    public String getLink() throws IOException {   
    		PDPage page = this.getPage();
    		String pageLink = null;
    	    PDFTextStripperByArea stripper = new PDFTextStripperByArea();    		
    	    List<PDAnnotation> annotations = page.getAnnotations();
    	    //System.out.println("Annotations:"+ annotations.size());
    	    //first setup text extraction regions
    	    for( int j=0; j<annotations.size(); j++ )
    	    {
    	        PDAnnotation annot = annotations.get(j);
    	        if( annot instanceof PDAnnotationLink )
    	        {
    	            PDAnnotationLink link = (PDAnnotationLink)annot;
    	            PDRectangle rect = link.getRectangle();
    	            //need to reposition link rectangle to match text space
    	            float x = rect.getLowerLeftX();
    	            float y = rect.getUpperRightY();
    	            float width = rect.getWidth();
    	            float height = rect.getHeight();
    	            int rotation = page.getRotation();
    	            if( rotation == 0 )
    	            {
    	                PDRectangle pageSize = page.getMediaBox();
    	                y = pageSize.getHeight() - y;
    	            }
    	            else if( rotation == 90 )
    	            {
    	                //do nothing
    	            }

    	            Rectangle2D.Float awtRect = new Rectangle2D.Float( x,y,width,height );
    	            stripper.addRegion( "" + j, awtRect );
    	        }
    	    }

    	    stripper.extractRegions( page );

    	    for( int j=0; j<annotations.size(); j++ )
    	    {
    	        PDAnnotation annot = annotations.get(j);
    	        if( annot instanceof PDAnnotationLink )
    	        {
    	            PDAnnotationLink link = (PDAnnotationLink)annot;
    	            PDAction action = link.getAction();
    	            String urlText = stripper.getTextForRegion( "" + j );
    	            if( action instanceof PDActionURI )
    	            {
    	            	PDActionURI uri = (PDActionURI)action;
    	            	pageLink = uri.getURI();
    	            }
    	        }
    	    }
    	    return pageLink;
    	}

    
    public PDPage getPage() {
        return page;
    }

}
