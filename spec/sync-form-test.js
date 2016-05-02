'use strict';

const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../index');

describe("PDF Document operations sync", function() {

  let doc = null;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    doc = PDFDocument.loadSync(path.join(__dirname, 'files', 'form.pdf'));
  });

  afterAll(function() {
    doc.closeSync();
  });

  it('Load form', function() {

    let form = doc.getFormSync();
    let fields = form.getFieldsSync();

    //console.log('field', fields);

  });

});
