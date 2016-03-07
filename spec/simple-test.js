const PDFDocument = require('../lib/PDFDocument');
const PDFPage = require('../lib/PDFPage');
const PDFBox = require('../lib/PDFBox');
const path = require('path');

describe("PDF document basic operations", function() {

  const doc = PDFBox.loadSync(path.join(__dirname, 'files', 'single-page.pdf'));

  it('Load document sync', function() {
    expect(doc instanceof PDFDocument).toBeTruthy();
  });

  it('Pages count', function() {
    expect(doc.pagesCountSync() > 0).toBeTruthy();
  });

});
