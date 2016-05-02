'use strict';

const PDFDocument = require('../../index');
const path = require('path');
const loadPath = path.join(__dirname, '..', '..', 'spec', 'files', 'form.pdf');
const savePath = path.join(__dirname, '..', '..', 'spec', 'tmp', 'fill-out-form-examples.pdf');

let document = PDFDocument.loadSync(loadPath);

let form = document.getFormSync();
//let fields = form.getFieldsSync().toArraySync();

/*
fields.forEach(function(field) {
  console.log('field name', field.getFullyQualifiedNameSync());
});
*/

let txtGivenName = form.getFieldSync('Given Name Text Box');
let chkLanguage1 = form.getFieldSync('Language 1 Check Box');
let comboBoxCountry = form.getFieldSync("Country Combo Box");

txtGivenName.setValueSync('My name or value');
chkLanguage1.checkSync();

/*
comboBoxCountry.getOptionsSync().toArraySync().forEach(function(option) {
  console.log('option', option);
});
*/

comboBoxCountry.setValueSync('Bulgaria');

document.flattenSync();
document.saveSync(savePath);

document.closeSync();
