package br.com.appmania;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.rendering.ImageType;

import java.awt.Rectangle;
import java.awt.geom.AffineTransform;
import java.awt.image.AffineTransformOp;
import java.awt.image.BufferedImage;
import java.io.IOException;
import org.apache.pdfbox.text.PDFTextStripper;

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

    public PDPage getPage() {
        return page;
    }

}
