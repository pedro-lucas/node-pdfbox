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
            doc = PDFDocument.load("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/files/multi-page.pdf");
//            doc = PDFDocument.load("/Users/PedroLucas/Desktop/teste1.pdf");
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        System.out.println("Title: " + doc.getInformation("Title"));
        System.out.println("author: " + doc.getInformation("Author"));

        PDFPage page = doc.getPage(0);
        PDFPageImage pageImage = null;

        try {

            pageImage = page.getImage(page.getAspectFillScale(768, 1024));
            /*
            int x = (int)((pageImage.getImage().getWidth() - 300) / 2);
            int y = (int)((pageImage.getImage().getHeight() - 300) / 2);

            pageImage.save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/normal.png", "png");
            pageImage.cropImage(new Rectangle(x, y, 300, 300)).save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/croped.png", "png");
            pageImage.fitImage(100, 100).save("/Users/PedroLucas/Documents/Repository/node-pdfbox/spec/tmp/fit.png", "png");

            System.out.println("TEXT: " + page.getText());
            */

        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

    }

}
