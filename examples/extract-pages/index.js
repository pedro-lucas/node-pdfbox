'use strict';

const PDFDocument = require('../../index');
const path = require('path');
const currentDocumentPath = path.join(__dirname, '..', '..', 'spec', 'files', 'multi-page.pdf');
const newDocumentPath = path.join(__dirname, '..', '..', 'spec', 'tmp', 'extract-examples.pdf');

console.info('load curent document');

let document = PDFDocument.loadSync(currentDocumentPath);
let page = document.getPageSync(0);

console.info('export to new document');

let newDocument = page.extractSync(newDocumentPath);

console.info('add new pages');
newDocument.addPageSync(document.getPageSync(3));
newDocument.addPagesSync(document, 0, 10, 1); //start, end, atIndex

console.info('save');

newDocument.saveSync();

console.info('finished');
