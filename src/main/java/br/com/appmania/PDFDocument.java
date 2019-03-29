package br.com.appmania;

import java.io.ByteArrayOutputStream;
import java.io.File;

import org.apache.pdfbox.cos.COSArray;
import org.apache.pdfbox.cos.COSDictionary;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.cos.COSStream;
import org.apache.pdfbox.pdmodel.*;
import org.apache.pdfbox.pdmodel.common.COSObjectable;
import org.apache.pdfbox.pdmodel.encryption.AccessPermission;
import org.apache.pdfbox.pdmodel.encryption.StandardProtectionPolicy;
import org.apache.pdfbox.pdmodel.interactive.action.PDActionJavaScript;
import org.apache.pdfbox.pdmodel.interactive.action.PDAnnotationAdditionalActions;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotation;
import org.apache.pdfbox.pdmodel.interactive.annotation.PDAnnotationWidget;
import org.apache.pdfbox.pdmodel.interactive.form.*;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class PDFDocument {

    private PDDocument document;
    private String path;
    private PDFPage pdfPageObj;

    public PDFDocument(PDDocument doc) {
        this.document = doc;
        pdfPageObj = new PDFPage(this.document);
    }

    public PDFDocument(String path) throws IOException {
        this.path = path;
        this.document = PDDocument.load(new File(path));
        pdfPageObj = new PDFPage(this.document);
    }

    public static PDFDocument load(String path) throws IOException {
        return new PDFDocument(path);
    }

    public int pagesCount() {
        return document.getNumberOfPages();
    }

    public PDFPage getPage(int index) {
        pdfPageObj.initializePage(index);
        return pdfPageObj;
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

    public void close() throws IOException {
        System.out.println("PDFDocument CLOSE Method");
        document.close();
    }

    public void flatten() throws IOException {

        PDDocumentCatalog docCatalog = document.getDocumentCatalog();
        PDAcroForm acroForm = docCatalog.getAcroForm();

        Iterator<PDField> fields = acroForm.getFieldIterator();

        while (fields.hasNext()) {
            PDField field = fields.next();
            field.setReadOnly(true);
        }

        AccessPermission ap = new AccessPermission();
        ap.setCanModify(false);
        ap.setReadOnly();
        StandardProtectionPolicy spp = new StandardProtectionPolicy(null, null, ap);

        document.protect(spp);

    }

}
