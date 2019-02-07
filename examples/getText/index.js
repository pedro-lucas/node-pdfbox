'use strict';

const PDFDocument = require('../../index');
const path = require('path');
const currentDocumentPath = path.join(__dirname, '..', '..', 'spec', 'files', 'NCERT_SCI_G7_CH5_TK3.pdf');

console.info('load curent document');

let document = PDFDocument.loadSync(currentDocumentPath);
let total = document.pagesCountSync();
for (let i = 0; i < total; i++) {
  let page = document.getPageSync(i);
  // let text = page.getTextSync();
  // let link = page.getTestSync();
    let link = page.getLinkSync();
  // console.info('TEXT :: ' + i + ' ==== ' + text);
  console.info('LINK :: ' + i + ' ==== ' + JSON.stringify(link));
}

console.info('finished');
