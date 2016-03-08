'use strict';

class PDFPage {

  constructor(PDFPageJavaInstance) {
    this.PDFPageJavaInstance = PDFPageJavaInstance;
  }

  getBoxSync(type) {
    const rectJava = this.PDFPageJavaInstance.getBoxSync(type);
    return {width: rectJava.getWidthSync(), height: rectJava.getHeightSync()};
  }

  extractPageSync(path) {
    this.PDFPageJavaInstance.extractPageSync(path);
  }

  writeImageSync(path) {
    this.PDFPageJavaInstance.writeImageSync(path, PDFPage.BOX_CROP, 768, 1024);
  }

}

PDFPage.BOX_TRIM = 1;
PDFPage.BOX_ART = 2;
PDFPage.BOX_CROP = 3;
PDFPage.BOX_MEDIA = 4;
PDFPage.BOX_BLEED = 5;
PDFPage.BOX_BOUNDING = 6;

module.exports = PDFPage;
