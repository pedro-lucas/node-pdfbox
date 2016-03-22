'use strict';

const PageImage = require('./pdf-page-image');
const when = require('when');

class PDFPage {

  constructor(PDFPageJavaInstance) {
    this.PDFPageJavaInstance = PDFPageJavaInstance;
  }

  getPage() {
    return this.PDFPageJavaInstance;
  }

  getRectSync() {
    const rect = this.PDFPageJavaInstance.getRectSync();
    return {width: rect.getWidthSync(), height: rect.getHeightSync()};
  }

  getTextSync() {
    return this.PDFPageJavaInstance.getTextSync();
  }

  getImageSync() {
    let img = this.PDFPageJavaInstance.getImageSync.apply(this.PDFPageJavaInstance, arguments);
    return new PageImage(img);
  }

  getAspectFillScaleSync(width, height) {
    return this.PDFPageJavaInstance.getAspectFillScaleSync(width, height);
  }

  getAspectFitScaleSync(width, height) {
    return this.PDFPageJavaInstance.getAspectFitScaleSync(width, height);
  }

  extractPageSync(path) {
    this.PDFPageJavaInstance.extractPageSync(path);
  }

  getRect() {
    const that = this;
    return when.promise(function(resolve, reject) {
      that.PDFPageJavaInstance.getRectPromise()
      .then(function(rect) {
        resolve({width: rect.getWidthSync(), height: rect.getHeightSync()});
      })
      .catch(reject);
    });
  }

  getText() {
    return this.PDFPageJavaInstance.getTextPromise();
  }

  getImage() {
    const that = this;
    const args = arguments;
    return when.promise(function(resolve, reject) {
      that.PDFPageJavaInstance.getImagePromise.apply(that.PDFPageJavaInstance, args)
      .then(function(image) {
        resolve(new PageImage(image));
      })
      .catch(reject);
    });
  }

  getAspectFillScale(width, height) {
    return this.PDFPageJavaInstance.getAspectFillScalePromise(width, height);
  }

  getAspectFitScale(width, height) {
    return this.PDFPageJavaInstance.getAspectFitScalePromise(width, height);
  }

  extractPage(path) {
    return this.PDFPageJavaInstance.extractPagePromise(path);
  }

}

module.exports = PDFPage;
