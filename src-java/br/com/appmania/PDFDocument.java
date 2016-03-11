package br.com.appmania;

import java.io.File;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDDocumentInformation;
import org.jetbrains.annotations.Contract;

import java.io.IOException;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class PDFDocument {

    private PDDocument document;

    public PDFDocument(PDDocument doc) {
        this.document = doc;
    }

    public PDFDocument(String path) throws IOException {
        this.document = PDDocument.load(new File(path));
    }

    public int pagesCount() {
        return document.getNumberOfPages();
    }

    public PDFPage getPage(int index) {
        return new PDFPage(document, index);
    }

    @Contract("_ -> !null")
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
}
