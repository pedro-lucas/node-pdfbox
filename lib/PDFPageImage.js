'use strict';

class PDFPageImage {

  constructor(PDFPageImageJavaInstance) {
    this.PDFPageImageJavaInstance = PDFPageImageJavaInstance;
  }

  getWidthSync() {
    this.PDFPageImageJavaInstance.getWidthSync();
  }

  getHeightSync() {
    this.PDFPageImageJavaInstance.getHeightSync();
  }

  getBitmapRefSync() {
    this.PDFPageImageJavaInstance.getImageSync();
  }

  saveSync(file) {
    this.PDFPageImageJavaInstance.saveSync(file);
  }

  saveWithFormatSync(file, format) {
    this.PDFPageImageJavaInstance.saveSync(file, format);
  }

}

module.exports = PDFPageImage;
