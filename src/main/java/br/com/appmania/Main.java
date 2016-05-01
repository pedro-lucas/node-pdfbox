package br.com.appmania;

import org.apache.pdfbox.pdmodel.PDDocumentCatalog;
import org.apache.pdfbox.pdmodel.interactive.form.PDAcroForm;
import org.apache.pdfbox.pdmodel.interactive.form.PDField;

import java.io.IOException;
import java.util.Iterator;

/**
 * Created by PedroLucas on 3/9/16.
 */
public class Main {

    public static void main(String[] args) {

        PDFDocument doc = null;

        try {
            doc = PDFDocument.load("spec/files/form1.pdf");
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        PDFPage page = doc.getPage(0);

        PDDocumentCatalog docCatalog = doc.getDocument().getDocumentCatalog();
        PDAcroForm acroForm = docCatalog.getAcroForm();

        Iterator<PDField> it = acroForm.getFieldIterator();

        while (it.hasNext()) {
            PDField field = it.next();
            System.out.println(
                    field.getPartialName() +
                    " - " + field.getFullyQualifiedName() +
                    " - " + field.getAlternateFieldName() +
                            " - " + field.getMappingName());
        }

    }

}
