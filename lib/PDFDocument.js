'use strict';

class PDFDocument {

  constructor(PDFDocumentJavaInstance) {
    this.PDFDocumentJavaInstance = PDFDocumentJavaInstance;
  }

  pagesCountSync() {
    console.log('this.PDFDocumentJavaInstance', this.PDFDocumentJavaInstance);
    return this.PDFDocumentJavaInstance.pagesCountSync();
  }

}

module.exports = PDFDocument;
