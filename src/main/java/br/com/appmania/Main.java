package br.com.appmania;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {
        try {        	            
        	PDFDocument doc = PDFDocument.load("spec/files/linktest.PDF");
        	PDFPage page = doc.getPage(4);           
            System.out.println(page.getLink());
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

    }

}
