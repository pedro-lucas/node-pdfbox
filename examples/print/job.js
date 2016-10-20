'use strict';

const java = require('../../lib/java').getJavaInstance([
  '-Dawt.toolkit=sun.lwawt.macosx.LWCToolkit',
  '-Djava.awt.printerjob=sun.lwawt.macosx.CPrinterJob',
  '-Djava.awt.graphicsenv=sun.awt.CGraphicsEnvironment',
  '-Dfile.encoding=UTF-8',
]);
const PDFDocument = require('../../index');
const path = require('path');
const loadPath = path.join(__dirname, '..', '..', 'spec', 'files', 'multi-page.pdf');

const document = PDFDocument.loadSync(loadPath);
const jDocument = document.getDocument();

const job = java.callStaticMethodSync("java.awt.print.PrinterJob", "getPrinterJob");
const pageable = java.newInstanceSync("org.apache.pdfbox.printing.PDFPageable", jDocument.getDocumentSync());

job.setPageableSync(pageable);

module.exports = job;
