'use strict';

const Page = require('./pdf-page');
const java = require('./java').getJavaInstance();

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
   * [addPagesSync description]
   * @param {String|PDFDocument} param0  PDFDocument or path do file
   * @param {int} param1    Start page or Insert at position
   * @param {int} param2    End page
   * @param {int} param3    Insert at position
   */
  addPagesSync() {
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

  addPageSync(obj) {
    //console.log(obj.constructor.name);
  }

  saveSync() {

  }

  saveSync(file) {
    if(file == null) {
      this.PDFDocumentJavaInstance.saveSync();
    }else{
      this.PDFDocumentJavaInstance.saveSync(file);
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

  static load(path, callback) {
    const PDFDocumentJava = java.import('br.com.appmania.PDFDocument');
    PDFDocumentJava.load(path, function(err, doc) {
      if(err)
        callback(err, null);
      else
        callback(null, new PDFDocument(doc));
    });
  }

}

module.exports = PDFDocument;
