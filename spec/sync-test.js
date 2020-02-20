const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../index');
const PDFPage = PDFDocument.PDFPage;
const PDFPageImage = PDFDocument.PDFPageImage;

describe("PDF Document operations sync", function() {

  let doc = null;
  let page = null;
  let image = null;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
  });

  afterAll(function() {
    doc.closeSync();
  });

  it('Load document', function() {
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

    image.cropSync(200, 200, 300, 300).saveSync(file);

    expect(file).toHasFile();

  });

  it('Export page', function() {

    const file = path.join(__dirname, 'tmp', 'page.pdf');
    const doc = page.extractSync(file);

    expect(doc).toBeInstanceOf(PDFDocument);

    doc.closeSync();

  });

  it('Create and add one page to new pdf', function() {

    const file = path.join(__dirname, 'tmp', 'one-page-document.pdf');
    const newPage = doc.getPageSync(10);

    let nDocument = newPage.extractSync(file);
    nDocument.addPageSync(doc.getPageSync(3));
    nDocument.saveSync();

    expect(nDocument.pagesCountSync() == 2).toBeTruthy();

    nDocument.closeSync();

  });

  it('Add pages from pdf', function() {

    const file = path.join(__dirname, 'tmp', 'document-append.pdf');

    let nDocument = page.extractSync(file);
    nDocument.addPagesSync(doc, 10, 20, 0);
    nDocument.saveSync();

    expect(nDocument.pagesCountSync() == 11).toBeTruthy();

    nDocument.closeSync();

  });

});
