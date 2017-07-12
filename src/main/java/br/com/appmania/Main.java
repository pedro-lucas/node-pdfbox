package br.com.appmania;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {

        try {
            PDFDocument doc = PDFDocument.load("spec/files/multi-page.pdf");
            PDFPage page = doc.getPage(0);
            PDFPageImage image = page.getImage(1, "png");
            image.save("spec/tmp/image.png");
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

    }

}
