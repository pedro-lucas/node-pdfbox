package br.com.appmania;

import org.apache.pdfbox.cos.COSArray;
import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.*;

import java.io.IOException;
import java.util.Iterator;
import java.util.List;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {

        PDFDocument doc = null;
        PDFPage page = null;
        PDFPageImage image = null;

        try {
            doc = PDFDocument.load("spec/files/multi-page.pdf");
            page = doc.getPage(0);
            image = page.getImage(2, "png");
            image.save("spec/tmp/image.png");
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }


    }

}
