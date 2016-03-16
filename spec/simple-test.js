'use strict';

const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../lib/PDFDocument');
const PDFPage = require('../lib/PDFPage');
const PDFBox = require('../lib/PDFBox');

describe("PDF Document operations sync", function() {

  let doc = null;
  let page = null;
  let image = null;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
  });

  it('New document', function() {
    doc = PDFBox.loadSync(path.join(__dirname, 'files', 'multi-page.pdf'));
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

  it('Get CropBox size from page', function() {
    expect(page.getRectSync().width > 0).toBeTruthy();
  });

  it('Get page text', function() {
    expect(page.getTextSync()).toMatch(/CakePHP/);
  });

  it('Get page image', function() {
    image = page.getImageSync();
    expect(image).toBeInstanceOf(PDFPageImage);
  });

  it('Get save image', function() {

    const file = path.join(__dirname, 'tmp', 'image.jpg');

    image.saveSync(file);

    expect(file).toHasFile();

  });

  it('Export page', function() {

    const file = path.join(__dirname, 'tmp', 'page.pdf');

    page.extractPageSync(file);

    expect(file).toHasFile();

  });

  /*
  it('Create image', function() {
    const file = path.join(__dirname, 'build', 'image.jpg');
    page.writeImageSync(file);
    expect(file).toHasFile();
  });
  */

});
