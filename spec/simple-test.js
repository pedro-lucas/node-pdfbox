'use strict';

const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../lib/PDFDocument');
const PDFPage = require('../lib/PDFPage');
const PDFBox = require('../lib/PDFBox');

describe("PDF document basic operations", function() {

  let doc = null;
  let page = null;

  beforeEach(function() {
    jasmine.addMatchers(matchers);
  });

  it('Load document sync', function() {
    doc = PDFBox.loadSync(path.join(__dirname, 'files', 'multi-page.pdf'));
    expect(doc).toBeInstanceOf(PDFDocument);
  });

  it('Pages count sync', function() {
    expect(doc.pagesCountSync() > 0).toBeTruthy();
  });

  it('Get page', function() {
    page = doc.getPageSync(0);
    expect(page).toBeInstanceOf(PDFPage);
  });

  it('Get page art box', function() {
    expect(page.getBoxSync(PDFPage.BOX_ART).width > 0).toBeTruthy();
  });

  it('Get page bleed box', function() {
    expect(page.getBoxSync(PDFPage.BOX_BLEED).width > 0).toBeTruthy();
  });

  it('Get page bounding box', function() {
    expect(page.getBoxSync(PDFPage.BOX_BOUNDING).width > 0).toBeTruthy();
  });

  it('Get page crop box', function() {
    expect(page.getBoxSync(PDFPage.BOX_CROP).width > 0).toBeTruthy();
  });

  it('Get page media box', function() {
    expect(page.getBoxSync(PDFPage.BOX_MEDIA).width > 0).toBeTruthy();
  });

  it('Get page trim box', function() {
    expect(page.getBoxSync(PDFPage.BOX_TRIM).width > 0).toBeTruthy();
  });

  it('Export page', function() {

    const file = path.join(__dirname, 'build', 'page.pdf');

    page.extractPageSync(file);

    expect(file).toHasFile();

  });

  it('Create image', function() {
    const file = path.join(__dirname, 'build', 'image.jpg');
    page.writeImageSync(file);
    expect(file).toHasFile();
  });

});
