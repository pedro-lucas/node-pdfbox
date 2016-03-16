package br.com.appmania;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.rendering.PDFRenderer;

import java.awt.Rectangle;
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

    public void extractPage(String savePath) throws IOException {
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

    public PDFPageImage getImage(float scale) throws IOException {
        PDFRenderer render = new PDFRenderer(document);
        return new PDFPageImage(render.renderImage(pageIndex, scale));
    }

    public PDFPageImage getImage(int width, int height) throws IOException {

        float scale = this.getAspectFillScale(width, height);
        PDFPageImage image = this.getImage(scale);

        int x = (int)((image.getImage().getWidth() - width) / 2.0f);
        int y = (int)((image.getImage().getHeight() - height) / 2.0f);

        return image.cropImage(new Rectangle(x, y, width, height));

    }

    public String getText() throws IOException {
        PDFTextStripper textStripper = new PDFTextStripper();
        textStripper.setStartPage(pageIndex);
        textStripper.setEndPage(pageIndex+1);
        textStripper.setLineSeparator("\n");
        return textStripper.getText(document);
    }

}
