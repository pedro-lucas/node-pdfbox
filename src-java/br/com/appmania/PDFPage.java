package br.com.appmania;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.rendering.PDFRenderer;
import java.io.IOException;
import java.io.File;
import java.awt.image.BufferedImage;
import java.awt.Graphics2D;
import javax.imageio.ImageIO;
import org.apache.pdfbox.rendering.ImageType;

public class PDFPage {

  public static final int BOX_TRIM = 1;
  public static final int BOX_ART = 2;
  public static final int BOX_CROP = 3;
  public static final int BOX_MEDIA = 4;
  public static final int BOX_BLEED = 5;
  public static final int BOX_BOUNDING = 6;

  private PDPage page;
  private int pageIndex;
  private PDDocument document;

  public PDFPage(PDDocument document, int index) {
    this.document = document;
    this.pageIndex = index;
    this.page = document.getPage(index);
  }

  public PDRectangle getBox(int type) {
    switch(type) {
      case PDFPage.BOX_TRIM:
        return page.getTrimBox();
      case PDFPage.BOX_ART:
        return page.getArtBox();
      case PDFPage.BOX_CROP:
        return page.getCropBox();
      case PDFPage.BOX_MEDIA:
        return page.getMediaBox();
      case PDFPage.BOX_BLEED:
        return page.getBleedBox();
    }
    return page.getBBox();
  }

  public void extractPage(String savePath) throws IOException {
    PDDocument doc = new PDDocument();
    doc.addPage(page);
    doc.save(savePath);
    doc.close();
  }

  public void writeImage(String path, int boxType, int width, int height) throws IOException {

    File file = new File(path);

    PDRectangle currentBox = getBox(boxType);
    PDRectangle bBox = getBox(PDFPage.BOX_BOUNDING);

    float cWidth = currentBox.getWidth();
    float cHeight = currentBox.getHeight();
    float scale = Math.max((float)width / cWidth, (float)height / cHeight);

    int sWidth = (int)(scale * cWidth);
    int sHeight = (int)(scale * cHeight);
    int x = (int)((bBox.getWidth() * scale) - sWidth) / 2;
    int y = (int)((bBox.getHeight() * scale) - sHeight) / 2;

    PDFRenderer render = new PDFRenderer(document);

    BufferedImage image = render.renderImage(pageIndex, scale, ImageType.ARGB);

    System.out.println("\nx: " + x + "\ny: " + y + "\nwidth: " + sWidth + "\nheight: " + sHeight);

    BufferedImage bufferedImage = new BufferedImage(sWidth, sHeight, BufferedImage.TYPE_INT_RGB);
    Graphics2D bufImageGraphics = bufferedImage.createGraphics();

    bufImageGraphics.drawImage(image, x, y, null);

    ImageIO.write(bufferedImage, "jpg", file);

  }

}
