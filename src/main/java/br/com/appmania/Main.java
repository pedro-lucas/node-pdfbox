package br.com.appmania;

import org.apache.pdfbox.cos.COSArray;
import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.*;
import org.apache.pdfbox.printing.PDFPageable;

import java.awt.*;
import java.awt.print.PrinterException;
import java.awt.print.PrinterJob;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {

//        PDFDocument doc = null;
//        PDFPage page = null;
//        PDFPageImage image = null;

        try {
//            PDFDocument doc = PDFDocument.load("spec/files/multi-page.pdf");
//            PrinterJob job = PrinterJob.getPrinterJob();
//            job.setPageable(new PDFPageable(doc.getDocument()));
//
//            if (job.printDialog())
//            {
//                job.print();
//            }
//            page = doc.getPage(0);
//            image = page.getImage(2, "png");
//            image.save("spec/tmp/image.png");
        } catch (Exception e) {
            e.printStackTrace();
            return;
        }

        System.getProperties().list(System.out);

    }

}
