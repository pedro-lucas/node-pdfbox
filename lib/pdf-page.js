'use strict';

const PageImage = require('./pdf-page-image');
const JavaObject = require('./java-object');
const when = require('when');

class PDFPage extends JavaObject {

  getPage() {
    return this.javaObject;
  }

  getRectSync() {
    const rect = this.javaObject.getRectSync();
    return {width: rect.getWidthSync(), height: rect.getHeightSync()};
  }

  getTextSync() {
    return this.javaObject.getTextSync();
  }

  getTestSync() {
    return this.javaObject.getTestSync();
  } 
   
  getLinkSync() {
    return this.javaObject.getLinkSync();
  } 

  getImageSync() {
    let img = this.javaObject.getImageSync.apply(this.javaObject, arguments);
    return new PageImage(img);
  }

  getAspectFillScaleSync(width, height) {
    return this.javaObject.getAspectFillScaleSync(width, height);
  }

  getAspectFitScaleSync(width, height) {
    return this.javaObject.getAspectFitScaleSync(width, height);
  }

  extractSync(path) {
    this.javaObject.extractSync(path);
    const Document = require('./pdf-document');
    return Document.loadSync(path);
  }

  getRect() {
    const that = this;
    return when.promise(function(resolve, reject) {
      that.javaObject.getRectPromise()
      .then(function(rect) {
        resolve({width: rect.getWidthSync(), height: rect.getHeightSync()});
      })
      .catch(reject);
    });
  }

  getText() {
    return this.javaObject.getTextPromise();
  }

  getImage() {
    const that = this;
    const args = arguments;
    return when.promise(function(resolve, reject) {
      that.javaObject.getImagePromise.apply(that.javaObject, args)
      .then(function(image) {
        resolve(new PageImage(image));
      })
      .catch(reject);
    });
  }

  getAspectFillScale(width, height) {
    return this.javaObject.getAspectFillScalePromise(width, height);
  }

  getAspectFitScale(width, height) {
    return this.javaObject.getAspectFitScalePromise(width, height);
  }

  extract(path) {
    const that = this;
    const args = arguments;
    return when.promise(function(resolve, reject) {
      that.javaObject.extractPromise(path)
      .then(function() {
        const Document = require('./pdf-document');
        return Document.load(path);
      })
      .then(function(doc) {
        resolve(doc);
      })
      .catch(reject);
    });
  }

}

module.exports = PDFPage;
