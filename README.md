Node PDFBox
=======

node-pdfbox is a bridge library to manipulate PDF based on PDFBox (https://pdfbox.apache.org/)

Installation
------------

### Dependencies

This module require JVM configured on host machine to work. When you use this module with nw.js you need to specify this requisite on installation process.

```js
bower install --save node-pdfbox
```

Quick Examples
-------

If you want to call async operations just use the method without Sync suffix.

#### Load document

```js
const Document = require('node-pdfbox');

let document = Document.loadSync('/path/to/document.pdf');
let page = document.getPageSync(0);
let image = page.getImageSync();

let newDocument = page.exportSync('path-to-new-document.pdf');
newDocument.addPageSync(document.getPageSync(3));
newDocument.addPageSync(document.getPageSync(3));

image.save('path.jpg');
image.save('path-ext.jpeg', 'jpg');

```

or

```js

Document.load('/path/to/document.pdf')
.then(function(document) {
  return document.getPage(0);
})
.then(function(page) {
  return page.getImage(2.0) //scale
})
.then(function(image) {
  //do something ...
})
.catch(function(err) {
  console.error(err);
})
.finally(function() {
  //Done!
});

```

#### Get information

#### Number of pages

#### Add pages to document

#### Save document

#### Get page

#### Get crop box rect

#### Get scale to fill

#### Get scale to fit

#### Get text

#### Extract page

#### Create image

#### Fit image

#### Crop image

#### Save image




Not implemented yet
------------
  - Working with Encrypting and signing PDFs
  - Support to create PDF
