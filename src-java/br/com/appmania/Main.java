package br.com.appmania;

import java.awt.*;
import java.io.IOException;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {

        PDFDocument doc = null;

        try {
//            doc = PDFDocument.load("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/files/multi-page.pdf");
            doc = PDFDocument.load("/Users/PedroLucas/Desktop/teste1.pdf");
        } catch (IOException e) {

            e.printStackTrace();
            return;
        }

        PDFPage page = doc.getPage(0);
        PDFPageImage pageImage = null;
        PDFPageImage cropImage = null;

        try {
            //pageImage = page.getImage(page.getAspectFillScale(PDFBoxType.CROP, 768, 1024));

            pageImage = page.getImage(1.5f);

            //int x = (int)((pageImage.getImage().getWidth() - 768) / 2);
            //int y = (int)((pageImage.getImage().getHeight() - 1024) / 2);
            //cropImage = pageImage.cropImage(new Rectangle(x, y, 768, 1024));

            pageImage.save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/normal.jpg");
            //pageImage.save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/croped-from-pdf.jpg");
            //cropImage.save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/croped.jpg");
            //pageImage.fitImage(768, 1024).save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/fit.jpg");

        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

    }

}
