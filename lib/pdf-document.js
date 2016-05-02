'use strict';

const JavaObject = require('./java-object');
const Page = require('./pdf-page');
const java = require('./java').getJavaInstance();
const when = require('when');

class PDFDocument extends JavaObject {

  pagesCountSync() {
    return this.javaObject.pagesCountSync();
  }

  getPageSync(i) {
    return new Page(this.javaObject.getPageSync(i));
  }

  getInfoSync(key) {
    return this.javaObject.getInformationSync(key);
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
    this.javaObject.addPagesSync.apply(this.javaObject, arguments);
  }

  addPageSync() {
    if(arguments.length > 0 && arguments[0].constructor.name == 'PDFPage') {
      arguments[0] = arguments[0].getPage();
    }
    this.javaObject.addPageSync.apply(this.javaObject, arguments);
  }

  saveSync() {
    this.javaObject.saveSync.apply(this.javaObject, arguments);
  }

  getPathSync() {
    return this.javaObject.getPathSync();
  }

  getDocument() {
    return this.javaObject;
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
    return this.javaObject.getInformationPromise(key);
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
    return this.javaObject.pagesCountPromise();
  }

  getPage(i) {
    const that = this;
    return when.promise(function(resolve, reject) {
      that.javaObject.getPagePromise(i)
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
    return this.javaObject.addPagesPromise.apply(this.javaObject, arguments);
  }

  addPage() {
    if(arguments.length > 0 && arguments[0].constructor.name == 'PDFPage') {
      arguments[0] = arguments[0].getPage();
    }
    return this.javaObject.addPagePromise.apply(this.javaObject, arguments);
  }

  save() {
    return this.javaObject.savePromise.apply(this.javaObject, arguments);
  }

  getPath() {
    return this.javaObject.getPathPromise();
  }

  getForm() {
    return this.javaObject.getDocumentSync().getDocumentCatalogSync().getAcroFormPromise();
  }

  getFormSync() {
    return this.javaObject.getDocumentSync().getDocumentCatalogSync().getAcroFormSync();
  }

  close() {
    let call = this.javaObject.getDocumentSync().closePromise;
    this.javaObject = null;
    return call();
  }

  closeSync() {
    this.javaObject.getDocumentSync().closeSync();
    this.javaObject = null;
  }

  flattenSync() {
    this.javaObject.flattenSync();
  }

  flatten() {
    this.javaObject.flattenPromise();
  }

}

module.exports = PDFDocument;
