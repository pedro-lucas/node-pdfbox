'use strict';

const PDFPage = require('./PDFPage');

class PDFDocument {

  constructor(PDFDocumentJavaInstance) {
    this.PDFDocumentJavaInstance = PDFDocumentJavaInstance;
  }

  pagesCount(callback) {
    this.PDFDocumentJavaInstance.pagesCount(callback);
  }

  pagesCountSync() {
    return this.PDFDocumentJavaInstance.pagesCountSync();
  }

  getPageSync(i) {
    return new PDFPage(this.PDFDocumentJavaInstance.getPageSync(i));
  }

}

module.exports = PDFDocument;
