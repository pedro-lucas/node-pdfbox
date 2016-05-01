package br.com.appmania;

import java.io.File;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;

import java.io.IOException;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class PDFDocument {

    private PDDocument document;
    private String path;

    public PDFDocument(PDDocument doc) {
        this.document = doc;
    }

    public PDFDocument(String path) throws IOException {
        this.path = path;
        this.document = PDDocument.load(new File(path));
    }

    public int pagesCount() {
        return document.getNumberOfPages();
    }

    public PDFPage getPage(int index) {
        return new PDFPage(document, index);
    }

    public static PDFDocument load(String path) throws IOException {
        return new PDFDocument(path);
    }

    public PDDocument getDocument() {
        return document;
    }

    public String getInformation(String name) {
        Object value = document.getDocumentInformation().getPropertyStringValue(name);
        return value == null ? "" : value.toString();
    }

    public PDDocumentInformation getInformation() {
        return document.getDocumentInformation();
    }

    public void addPage(String file, int page, int insertAt) throws IOException {
        addPage(PDFDocument.load(file).getPage(page), insertAt);
    }

    public void addPage(PDFPage page) throws IOException {
        document.addPage(page.getPage());
    }

    public void addPage(PDFPage page, int insertAt) {
        int pagesCount = document.getNumberOfPages();
        if(insertAt >= pagesCount) {
            document.addPage(page.getPage());
        }else{
            document.getPages().insertBefore(page.getPage(), document.getPage(insertAt));
        }
    }

    public void addPages(String file) throws IOException {
        addPages(PDFDocument.load(file));
    }
    public void addPages(String file, int insertAt) throws IOException {
        addPages(PDFDocument.load(file), insertAt);
    }

    public void addPages(PDFDocument doc) {
        addPages(doc, doc.pagesCount());
    }

    public void addPages(PDFDocument doc, int insertAt) {
        addPages(doc, 0, doc.pagesCount(), insertAt);
    }

    public void addPages(PDFDocument doc, int start, int end, int insertAt) {
        int inc = insertAt;
        for(int i=start;i<end;i++) {
            addPage(doc.getPage(i), inc);
            inc++;
        }
    }

    public void save() throws IOException {
        document.save(new File(path));
    }

    public void save(String path) throws IOException {
        document.save(new File(path));
    }

    public String getPath() {
        return path;
    }

}
