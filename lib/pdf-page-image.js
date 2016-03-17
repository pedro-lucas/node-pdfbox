'use strict';

const extend = require('extend');
const java = require('./java').getJavaInstance();

class PDFPageImage {

  constructor(PDFPageImageJavaInstance) {
    this.PDFPageImageJavaInstance = PDFPageImageJavaInstance;
  }

  getWidthSync() {
    return this.PDFPageImageJavaInstance.getWidthSync();
  }

  getHeightSync() {
    return this.PDFPageImageJavaInstance.getHeightSync();
  }

  getBitmapRefSync() {
    return this.PDFPageImageJavaInstance.getImageSync();
  }

  saveSync(file) {
    this.PDFPageImageJavaInstance.saveSync(file);
  }

  saveWithFormatSync(file, format) {
    this.PDFPageImageJavaInstance.saveSync(file, format);
  }

  fitSync(width, height) {
    return new PDFPageImage(this.PDFPageImageJavaInstance.fitSync(width, height));
  }

  cropSync(width, height, crop) {
    let rect = this.getRectSync(width, height, crop);
    return new PDFPageImage(this.PDFPageImageJavaInstance.cropSync(rect));
  }

  cropInRectSync(x, y, width, height) {
    return new PDFPageImage(this.PDFPageImageJavaInstance.cropSync(java.newInstanceSync('java.awt.Rectangle', x, y, width, height)));
  }

  getRectSync(width, height, crop) {
    let opt = extend({
      vertical: 'center',
      horizontal: 'center'
    }, crop);

    let size = {width: this.getWidthSync(), height: this.getHeightSync()};
    let rect = {width: width, height: height};

    if(opt.vertical == 'top') {
      rect.y = 0;
    }else if(opt.vertical == 'bottom') {
      rect.y = size.height - rect.height;
    }else{
      rect.y = Math.ceil((size.height - rect.height) / 2);
    }

    if(opt.horizontal == 'left') {
      rect.x = 0;
    }else if(opt.horizontal == 'right') {
      rect.x = size.width - rect.width;
    }else{
      rect.x = Math.ceil((size.width - rect.width) / 2);
    }

    if(rect.x < 0) {
      throw new Error('Invalid crop x position. Out of bounds.');;
    }

    if(rect.y < 0) {
      throw new Error('Invalid crop y position. Out of bounds.');;
    }

    return java.newInstanceSync('java.awt.Rectangle', rect.x, rect.y, rect.width, rect.height);

  }

}

let cropV = 1;

PDFPageImage.CROP = cropV;

PDFPageImage.CROP_TOP = cropV << 0;
PDFPageImage.CROP_MIDDLE = cropV << 1;
PDFPageImage.CROP_BOTTOM = cropV << 2;

PDFPageImage.CROP_LEFT = cropV << 3;
PDFPageImage.CROP_CENTER = cropV << 4;
PDFPageImage.CROP_RIGHT = cropV << 5;

module.exports = PDFPageImage;
