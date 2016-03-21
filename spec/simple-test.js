'use strict';

const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../lib/pdf-document');
const PDFPage = require('../lib/pdf-page');
const PDFPageImage = require('../lib/pdf-page-image');

describe("PDF Document operations sync", function() {

  let doc = null;
  let page = null;
  let image = null;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
  });

  it('New document', function() {
    doc = PDFDocument.loadSync(path.join(__dirname, 'files', 'multi-page.pdf'));
    expect(doc).toBeInstanceOf(PDFDocument);
  });

  it('Document title', function() {
    expect(doc.getInfoSync('Title')).toEqual("CakePHP");
  });

  it('Document author', function() {
    expect(doc.getAuthorSync()).toEqual("CakePHP Org");
  });

  it('Document subject', function() {
    expect(doc.getSubjectSync()).toEqual("Writing node-pdfbox module");
  });

  it('Document keywords', function() {
    expect(doc.getKeywordsSync()).toEqual("Some tests added");
  });

  it('Pages count', function() {
    expect(doc.pagesCountSync() > 0).toBeTruthy();
  });

  it('Get page', function() {
    page = doc.getPageSync(0);
    expect(page).toBeInstanceOf(PDFPage);
  });

  it('Get crop box', function() {
    expect(page.getRectSync().width > 0).toBeTruthy();
  });

  it('Get page text', function() {
    expect(page.getTextSync()).toMatch(/CakePHP/);
  });

  it('Create image from page', function() {
    image = page.getImageSync();
    expect(image).toBeInstanceOf(PDFPageImage);
  });

  it('Save image', function() {

    const file = path.join(__dirname, 'tmp', 'image.png');

    image.saveSync(file);

    expect(file).toHasFile();

  });

  it('Fit image', function() {

    const file = path.join(__dirname, 'tmp', 'fit.png');

    image.fitSync(100, 100).saveSync(file);

    expect(file).toHasFile();

  });

  it('Crop image', function() {

    const file = path.join(__dirname, 'tmp', 'crop.png');

    image.cropSync(301, 301).saveSync(file);

    expect(file).toHasFile();

  });

  it('Crop image with area', function() {

    const file = path.join(__dirname, 'tmp', 'crop-area.png');

    image.cropSync(612, 300, {vertical: 'top'}).saveSync(file);

    expect(file).toHasFile();

  });

  it('Crop image with position', function() {

    const file = path.join(__dirname, 'tmp', 'crop-position.png');

    image.cropInRectSync(200, 200, 300, 300).saveSync(file);

    expect(file).toHasFile();

  });

  it('Export page', function() {

    const file = path.join(__dirname, 'tmp', 'page.pdf');

    page.extractPageSync(file);

    expect(file).toHasFile();

  });

  it('Create and add one page to new pdf', function() {

    const file = path.join(__dirname, 'tmp', 'one-page-document.pdf');
    const newPage = doc.getPageSync(10);

    newPage.extractPageSync(file);

    let nDocument = PDFDocument.loadSync(file);
    nDocument.addPageSync(doc.getPageSync(3));
    nDocument.saveSync();

    expect(nDocument.pagesCountSync() == 2).toBeTruthy();

  });

  it('Add pages from pdf', function() {

    const file = path.join(__dirname, 'tmp', 'document-append.pdf');
    const appendFile = path.join(__dirname, 'files', 'single-page.pdf');

    page.extractPageSync(file);

    let nDocument = PDFDocument.loadSync(file);
    nDocument.addPagesSync(doc, 10, 20, 0);
    nDocument.saveSync();

    expect(nDocument.pagesCountSync() == 11).toBeTruthy();

  });

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

    it('New document (promise)', function(done) {
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

  });

});
