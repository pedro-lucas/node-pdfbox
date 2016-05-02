'use strict';

const extend = require('extend');
const java = require('./java').getJavaInstance();
const JavaObject = require('./java-object');
const when = require('when');

class PDFPageImage extends JavaObject {

  getImage() {
    return this.javaObject;
  }

  getWidthSync() {
    return this.javaObject.getWidthSync();
  }

  getHeightSync() {
    return this.javaObject.getHeightSync();
  }

  getBitmapRefSync() {
    return this.javaObject.getImageSync();
  }

  saveSync() {
    this.javaObject.saveSync.apply(this.javaObject, arguments);
  }

  fitSync(width, height) {
    return new PDFPageImage(this.javaObject.fitSync(width, height));
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
    return new PDFPageImage(this.javaObject.cropSync(rect));
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
    return this.javaObject.savePromise.apply(this.javaObject, arguments);
  }

  fit(width, height) {
    const that = this;
    const args = arguments;
    return when.promise(function(resolve, reject) {
      that.javaObject.fitPromise(width, height)
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
      that.javaObject.cropPromise(rect)
      .then(function(img) {
        resolve(new PDFPageImage(img));
      })
      .catch(reject);
    });
  }

  getWidth() {
    return this.javaObject.getWidthPromise();
  }

  getHeight() {
    return this.javaObject.getHeightPromise();
  }

  getBitmapRef() {
    return this.javaObject.getImagePromise();
  }

}

module.exports = PDFPageImage;
