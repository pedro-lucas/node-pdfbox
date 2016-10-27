'use strict';

const java = require('../../lib/java').getJavaInstance();
const PDFDocument = require('../../index');
const path = require('path');
const loadPath = path.join(__dirname, '..', '..', 'spec', 'files', 'single-page.pdf');

const document = PDFDocument.loadSync(loadPath);
const jDocument = document.getDocument();

const job = java.callStaticMethodSync("java.awt.print.PrinterJob", "getPrinterJob");
const pageable = java.newInstanceSync("org.apache.pdfbox.printing.PDFPageable", jDocument.getDocumentSync());

job.setPageableSync(pageable);

module.exports = job;
