'use strict';

const matchers = require('./matchers');
const path = require('path');

const PDFDocument = require('../index');

describe("PDF Document operations sync", function() {

  let doc = null;
  let form = null;

  beforeAll(function() {
    jasmine.addMatchers(matchers);
    doc = PDFDocument.loadSync(path.join(__dirname, 'files', 'form.pdf'));
  });

  afterAll(function() {
    doc.closeSync();
  });

  it('Load form', function() {
    form = doc.getFormSync();
    expect(form !== undefined).toBeTruthy();
  });

  it('Get fields', function() {
    let fields = form.getFieldsSync().toArraySync();
    expect(fields.length == 17).toBeTruthy();
  });

  it('Get fields by name', function() {
    let field = form.getFieldSync('Given Name Text Box');
    expect(field !== undefined).toBeTruthy();
  });

  it('Flatten document', function() {
    let file = path.join(__dirname, 'tmp', 'flatten-form.pdf');
    doc.flattenSync();
    doc.saveSync(file)
    expect(file).toHasFile();
  });

});
