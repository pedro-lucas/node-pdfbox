'use strict';

const java = require('java');
const path = require('path');
const PDFDocument = require('./PDFDocument');

java.classpath.push("./src-library/jai-imageio-core-1.3.1.jar");
java.classpath.push("./src-library/levigo-jbig2-imageio-1.6.5.jar");
java.classpath.push("./src-library/pdfbox-2.0.0.RC3.jar");
java.classpath.push("./src-java");

class PDFBox {

  static loadSync(path) {

    const PDFDocumentJava = java.import('br.com.appmania.PDFDocument');
    let doc = null;

    try {
      doc = PDFDocumentJava.loadSync(path);
    }catch(ex) {
      console.error(ex);
      return null;
    }

    return new PDFDocument(doc);

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

module.exports = PDFBox;
