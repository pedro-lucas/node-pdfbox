'use strict';

const extend = require('extend');
const java = require('./java').getJavaInstance();
const when = require('when');

class PDFPageImage {

  constructor(PDFPageImageJavaInstance) {
    this.PDFPageImageJavaInstance = PDFPageImageJavaInstance;
  }

  getImage() {
    return this.PDFPageImageJavaInstance;
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

  saveSync() {
    this.PDFPageImageJavaInstance.saveSync.apply(this.PDFPageImageJavaInstance, arguments);
  }

  fitSync(width, height) {
    return new PDFPageImage(this.PDFPageImageJavaInstance.fitSync(width, height));
  }

  cropSync() {
    let rect;
    if(arguments.length < 4) {
      rect = this.getRect.apply(this, arguments);
    }else{
      let args = Array.prototype.slice.call(arguments);
      args.unshift('java.awt.Rectangle');
      rect = java.newInstanceSync.apply(java, args);
    }
    return new PDFPageImage(this.PDFPageImageJavaInstance.cropSync(rect));
  }

  getRect(width, height, crop) {
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

  save() {
    return this.PDFPageImageJavaInstance.savePromise.apply(this.PDFPageImageJavaInstance, arguments);
  }

  fit(width, height) {
    const that = this;
    const args = arguments;
    return when.promise(function(resolve, reject) {
      that.PDFPageImageJavaInstance.fitPromise(width, height)
      .then(function(img) {
        resolve(new PDFPageImage(img));
      })
      .catch(reject);
    });
  }

  crop() {
    const that = this;
    const args = arguments;
    let rect;
    if(arguments.length < 4) {
      rect = this.getRect.apply(this, arguments);
    }else{
      let args = Array.prototype.slice.call(arguments);
      args.unshift('java.awt.Rectangle');
      rect = java.newInstanceSync.apply(java, args);
    }
    return when.promise(function(resolve, reject) {
      that.PDFPageImageJavaInstance.cropPromise(rect)
      .then(function(img) {
        resolve(new PDFPageImage(img));
      })
      .catch(reject);
    });
  }

  getWidth() {
    return this.PDFPageImageJavaInstance.getWidthPromise();
  }

  getHeight() {
    return this.PDFPageImageJavaInstance.getHeightPromise();
  }

  getBitmapRef() {
    return this.PDFPageImageJavaInstance.getImagePromise();
  }

}

module.exports = PDFPageImage;
