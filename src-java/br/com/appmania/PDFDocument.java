package br.com.appmania;

import java.io.File;
import org.apache.pdfbox.pdmodel.PDDocument;
import java.io.IOException;

public class PDFDocument {

  private PDDocument document;

  public PDFDocument(PDDocument doc) {
    this.document = doc;
  }

  public PDFDocument(String path) throws IOException {
    this.document = PDDocument.load(new File(path));
  }

  public static PDFDocument load(String path) throws IOException {
    return new PDFDocument(path);
  }

  public int pagesCount() {
    return this.document.getNumberOfPages();
  }

}
