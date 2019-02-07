package br.com.appmania;

import java.io.File;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {
        try {
            PDDocument doc = PDDocument.load(new File("spec/files/linktest.PDF"));
            for(int i=0; i<doc.getNumberOfPages();i++) {
            PDPage page = doc.getPage(i);
            PDFPage.getLink(page);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

    }

}
