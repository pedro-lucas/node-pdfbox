'use strict';

const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../index');
const PDFPage = PDFDocument.PDFPage;
const PDFPageImage = PDFDocument.PDFPageImage;

describe("PDF Document operations async", function() {

  let doc = null;
  let page = null;
  let image = null;

  beforeEach(function() {

    doc = PDFDocument.loadSync(path.join(__dirname, 'files', 'multi-page.pdf'));
    page = doc.getPageSync(0);
    image = page.getImageSync();

    jasmine.addMatchers(matchers);

  });

  it('Load document', function(done) {
    PDFDocument.load(path.join(__dirname, 'files', 'multi-page.pdf'))
    .then(function(val) {
      expect(val).toBeInstanceOf(PDFDocument);
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Document title', function(done) {
    doc.getInfo('Title')
    .then(function(val) {
      expect(val).toEqual("CakePHP");
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Document author', function(done) {
    doc.getAuthor()
    .then(function(val) {
      expect(val).toEqual("CakePHP Org");
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Document subject', function(done) {
    doc.getSubject()
    .then(function(val) {
      expect(val).toEqual("Writing node-pdfbox module");
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Document keywords', function(done) {
    doc.getKeywords()
    .then(function(val) {
      expect(val).toEqual("Some tests added");
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Pages count', function(done) {
    doc.pagesCount()
    .then(function(val) {
      expect(val > 0).toBeTruthy();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Get page', function(done) {
    doc.getPage(0)
    .then(function(val) {
      expect(val).toBeInstanceOf(PDFPage);
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Get crop box', function(done) {
    page.getRect()
    .then(function(rect) {
      expect(rect.width > 0 && rect.height > 0).toBeTruthy();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Get page text', function(done) {
    page.getText()
    .then(function(text) {
      expect(text).toMatch(/CakePHP/);
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });
  });

  it('Create image from page', function(done) {
    page.getImage()
    .then(function(image) {
      expect(image).toBeInstanceOf(PDFPageImage);
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    })
  });

  it('Save image', function(done) {

    const file = path.join(__dirname, 'tmp', 'image-async.png');

    image.save(file)
    .then(function() {
      expect(file).toHasFile();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Fit image', function(done) {

    const file = path.join(__dirname, 'tmp', 'fit-async.png');

    image.fit(100, 100)
    .then(function(img) {
      return img.save(file);
    })
    .then(function() {
      expect(file).toHasFile();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Crop image', function(done) {

    const file = path.join(__dirname, 'tmp', 'crop-async.png');

    image.crop(301, 301)
    .then(function(img) {
      return img.save(file);
    })
    .then(function() {
      expect(file).toHasFile();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Crop image with area', function(done) {

    const file = path.join(__dirname, 'tmp', 'crop-area-async.png');

    image.crop(612, 300, {vertical: 'top'})
    .then(function(img) {
      return img.save(file);
    })
    .then(function() {
      expect(file).toHasFile();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Crop image with position', function(done) {

    const file = path.join(__dirname, 'tmp', 'crop-position-async.png');

    image.crop(200, 200, 300, 300)
    .then(function(img) {
      return img.save(file);
    })
    .then(function() {
      expect(file).toHasFile();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Export page', function(done) {

    const file = path.join(__dirname, 'tmp', 'page-async.pdf');

    page.extract(file)
    .then(function(doc) {
      expect(doc).toBeInstanceOf(PDFDocument);
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Create and add one page to new pdf', function(done) {

    const file = path.join(__dirname, 'tmp', 'one-page-document-async.pdf');
    let nDocument;

    doc.getPage(10)
    .then(function(page) {
      return page.extract(file);
    })
    .then(function(d) {
      nDocument = d;
      return nDocument.addPage(doc.getPageSync(3));
    })
    .then(function() {
      return nDocument.save();
    })
    .then(function() {
      expect(nDocument.pagesCountSync() == 2).toBeTruthy();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

  it('Add pages from pdf', function(done) {

    const file = path.join(__dirname, 'tmp', 'document-append-async.pdf');
    let nDocument;

    doc.getPage(10)
    .then(function(page) {
      return page.extract(file);
    })
    .then(function(d) {
      nDocument = d;
      return nDocument.addPages(doc, 10, 20, 0);
    })
    .then(function() {
      return nDocument.save();
    })
    .then(function() {
      expect(nDocument.pagesCountSync() == 11).toBeTruthy();
    })
    .catch(function(err) {
      throw err;
    })
    .finally(function() {
      done();
    });

  });

});
