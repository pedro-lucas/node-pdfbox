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

        try {
            doc = PDFDocument.load("spec/files/form.pdf");
        } catch (IOException e) {
            e.printStackTrace();
            return;
        }

        PDDocumentCatalog docCatalog = doc.getDocument().getDocumentCatalog();

        PDAcroForm acroForm = docCatalog.getAcroForm();

        Iterator<PDField> it = acroForm.getFieldIterator();
        List<PDField> list =  acroForm.getFields();

        PDTextField txtGivenName = (PDTextField) acroForm.getField("Given Name Text Box");
        PDTextField txtFamilyName = (PDTextField) acroForm.getField("Family Name Text Box");
        PDTextField txtHouseNumber = (PDTextField) acroForm.getField("House nr Text Box");
        PDTextField txtAddress2 = (PDTextField) acroForm.getField("Address 2 Text Box");
        PDTextField txtPostcode = (PDTextField) acroForm.getField("Postcode Text Box");
        PDTextField txtHeight = (PDTextField) acroForm.getField("Height Formatted Field");
        PDTextField txtCity = (PDTextField) acroForm.getField("City Text Box");
        PDTextField txtAddress1 = (PDTextField) acroForm.getField("Address 1 Text Box");

        PDCheckBox chkDriving = (PDCheckBox) acroForm.getField("Driving License Check Box");
        PDCheckBox chkLanguage1 = (PDCheckBox) acroForm.getField("Language 1 Check Box");
        PDCheckBox chkLanguage2 = (PDCheckBox) acroForm.getField("Language 2 Check Box");
        PDCheckBox chkLanguage3 = (PDCheckBox) acroForm.getField("Language 3 Check Box");
        PDCheckBox chkLanguage4 = (PDCheckBox) acroForm.getField("Language 4 Check Box");
        PDCheckBox chkLanguage5 = (PDCheckBox) acroForm.getField("Language 5 Check Box");

        PDComboBox comboBoxCountry = (PDComboBox) acroForm.getField("Country Combo Box");
        PDComboBox comboBoxFavourite = (PDComboBox) acroForm.getField("Favourite Colour List Box");
        PDComboBox comboBoxGender = (PDComboBox) acroForm.getField("Gender List Box");

        System.out.println("Will fill form");

        try {
            txtGivenName.setValue("fill form");
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            doc.flatten();
        } catch (IOException e) {
            e.printStackTrace();
        }

        try {
            doc.save("spec/tmp/filled-out-form.pdf");
            doc.close();
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

}
