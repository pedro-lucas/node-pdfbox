'use strict';

const java = require('java');
const path = require('path');
const PDFDocument = require('./PDFDocument');

java.classpath.push("./pdfbox.jar");
java.classpath.push("./src-java");

class PDFBox {

  static loadSync(path) {

    const PDFDocumentJava = java.import('br.com.appmania.PDFDocument');
    let doc = null;

    try {
      doc = PDFDocumentJava.loadSync(path);
    }catch(ex) {
      console.error('teste', ex);
      return null;
    }

    return new PDFDocument(doc);

  }

}

module.exports = PDFBox;
