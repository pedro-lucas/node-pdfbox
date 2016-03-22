'use strict';

const Page = require('./pdf-page');
const java = require('./java').getJavaInstance();
const when = require('when');

class PDFDocument {

  constructor(PDFDocumentJavaInstance) {
    this.PDFDocumentJavaInstance = PDFDocumentJavaInstance;
  }

  pagesCountSync() {
    return this.PDFDocumentJavaInstance.pagesCountSync();
  }

  getPageSync(i) {
    return new Page(this.PDFDocumentJavaInstance.getPageSync(i));
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

  addPagesSync() {
    if(arguments.length > 0 && arguments[0].constructor.name == 'PDFDocument') {
      arguments[0] = arguments[0].getDocument();
    }
    this.PDFDocumentJavaInstance.addPagesSync.apply(this.PDFDocumentJavaInstance, arguments);
  }

  addPageSync() {
    if(arguments.length > 0 && arguments[0].constructor.name == 'PDFPage') {
      arguments[0] = arguments[0].getPage();
    }
    this.PDFDocumentJavaInstance.addPageSync.apply(this.PDFDocumentJavaInstance, arguments);
  }

  saveSync() {
    this.PDFDocumentJavaInstance.saveSync.apply(this.PDFDocumentJavaInstance, arguments);
  }

  getPathSync() {
    return this.PDFDocumentJavaInstance.getPathSync();
  }

  getDocument() {
    return this.PDFDocumentJavaInstance;
  }

  static loadSync(path) {
    const PDFDocumentJava = java.import('br.com.appmania.PDFDocument');
    return new PDFDocument(PDFDocumentJava.loadSync(path));
  }

  /* asynchronous operations */

  static load(path) {
    return when.promise(function(resolve, reject) {
      const PDFDocumentJava = java.import('br.com.appmania.PDFDocument');
      PDFDocumentJava.loadPromise(path)
      .then(function(doc) {
        resolve(new PDFDocument(doc));
      })
      .catch(reject);
    });
  }

  getInfo(key) {
    return this.PDFDocumentJavaInstance.getInformationPromise(key);
  }

  getTitle() {
    return this.getInfo('Title');
  }

  getAuthor() {
    return this.getInfo('Author');
  }

  getSubject() {
    return this.getInfo('Subject');
  }

  getKeywords() {
    return this.getInfo('Keywords');
  }

  pagesCount() {
    return this.PDFDocumentJavaInstance.pagesCountPromise();
  }

  getPage(i) {
    const that = this;
    return when.promise(function(resolve, reject) {
      that.PDFDocumentJavaInstance.getPagePromise(i)
      .then(function(page) {
        resolve(new Page(page));
      })
      .catch(reject);
    });
  }

  addPages() {
    if(arguments.length > 0 && arguments[0].constructor.name == 'PDFDocument') {
      arguments[0] = arguments[0].getDocument();
    }
    return this.PDFDocumentJavaInstance.addPagesPromise.apply(this.PDFDocumentJavaInstance, arguments);
  }

  addPage() {
    if(arguments.length > 0 && arguments[0].constructor.name == 'PDFPage') {
      arguments[0] = arguments[0].getPage();
    }
    return this.PDFDocumentJavaInstance.addPagePromise.apply(this.PDFDocumentJavaInstance, arguments);
  }

  save() {
    return this.PDFDocumentJavaInstance.savePromise.apply(this.PDFDocumentJavaInstance, arguments);
  }

  getPath() {
    return this.PDFDocumentJavaInstance.getPathPromise();
  }

}

module.exports = PDFDocument;
