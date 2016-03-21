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

  /**
   * Add multi pages to document from source(file or PDFDocument)
   *
   * @param {String|PDFDocument} src    PDFDocument or path do file
   * @param {int} param1    Start page or Insert at position
   * @param {int} param2    End page
   * @param {int} param3    Insert at position
   */
  addPagesSync() {

    if(arguments.length == 0) {
      throw new Error('Invalid parameters');
    }

    if(arguments[0].constructor.name == 'String') {
      if(arguments.length == 1) {
        this.PDFDocumentJavaInstance.addPagesSync(arguments[0]);
      }else if(arguments[1].constructor.name == 'Number'){
        this.PDFDocumentJavaInstance.addPagesSync(arguments[0], arguments[1]);
      }else{
        throw new Error('Invalid parameters');
      }
    }else if(arguments[0].constructor.name == 'PDFDocument') {
      if(arguments.length == 1) {
        this.PDFDocumentJavaInstance.addPagesSync(arguments[0].getDocument());
      }else if(arguments.length == 2 && arguments[1].constructor.name == 'Number') {
        this.PDFDocumentJavaInstance.addPagesSync(arguments[0].getDocument(), arguments[1]);
      }else if(arguments.length == 4
      && arguments[1].constructor.name == 'Number'
      && arguments[2].constructor.name == 'Number'
      && arguments[3].constructor.name == 'Number') {
        this.PDFDocumentJavaInstance.addPagesSync(arguments[0].getDocument(), arguments[1], arguments[2], arguments[3]);
      }else{
        throw new Error('Invalid parameters');
      }
    }else{
      throw new Error('Invalid parameters');
    }

  }

  /**
   * Add a single page to document from source(file or PDFPage)
   *
   * @param {String|PDFPage} src    PDFDocument or path do file
   * @param {int} param1    add page or insertAt
   * @param {int} param2    insertAt
   */
  addPageSync() {

    if(arguments.length == 0) {
      throw new Error('Invalid parameters');
    }

    if(arguments.length == 3
      && arguments[0].constructor.name == 'String'
      && arguments[1].constructor.name == 'Number'
      && arguments[2].constructor.name == 'Number') {
        this.PDFDocumentJavaInstance.addPageSync(arguments[0], arguments[1], arguments[2]);
    }else if(arguments[0].constructor.name == 'PDFPage') {
      if(arguments.length == 2
        && arguments[1].constructor.name == 'Number') {
          this.PDFDocumentJavaInstance.addPageSync(arguments[0].getPage(), arguments[1]);
      }else{
        this.PDFDocumentJavaInstance.addPageSync(arguments[0].getPage());
      }
    }else{
      throw new Error('Invalid parameters');
    }

  }

  saveSync(file) {
    if(file == null) {
      this.PDFDocumentJavaInstance.saveSync();
    }else if(file.constructor.name == 'String'){
      this.PDFDocumentJavaInstance.saveSync(file);
    }else{
      throw new Error('Invalid parameters');
    }
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

}

module.exports = PDFDocument;
