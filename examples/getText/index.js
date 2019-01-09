'use strict';

const PDFDocument = require('../../index');
const path = require('path');
const currentDocumentPath = path.join(__dirname, '..', '..', 'spec', 'files', 'sample.pdf');

console.info('load curent document');

let document = PDFDocument.loadSync(currentDocumentPath);
let page = document.getPageSync(2);

console.info('extract text from page ');

let text = page.getTextSync();

console.info('TEXT :: ' + text);


console.info('finished');
