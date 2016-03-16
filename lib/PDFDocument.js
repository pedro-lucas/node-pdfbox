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

  getInfoSync(key) {
    return this.PDFDocumentJavaInstance.getInformationSync(key);
  }

  getTitleSync() {
    return this.getInfoSync('Title');
  }

  getAuthorSync() {
    return this.getInfoSync('Author');
  }

  getSubjectSync() {
    return this.getInfoSync('Subject');
  }

  getKeywordsSync() {
    return this.getInfoSync('Keywords');
  }

}

module.exports = PDFDocument;
