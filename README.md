Node PDFBox
=======

node-pdfbox is a bridge library to manipulate PDF based on PDFBox (https://pdfbox.apache.org/)

Installation
------------

### Dependencies

This module require JVM configured on host machine to work. When you use this module with nw.js you need to specify this requisite on installation process.

You can use node-pdfbox with NW.js, but don't forget to install JDK to compile java module, after that you can distribute you app in a machine with JVM installed.

```js
npm install --save node-pdfbox
```

Quick Examples
-------

If you want to call async operations just use the method without Sync suffix.

Sync

```js
  page.extractSync('path.pdf');
```

Async

```js
  page.extract('path.pdf')
  .then(function() {

  })
  .catch(function(err) {

  })
  .finally(function() {

  });
```

#### Basic operations

```js
let Document = require('node-pdfbox');

let document = Document.loadSync('/path/to/document.pdf');
let page = document.getPageSync(0);
let image = page.getImageSync();
let imageScaled = page.getImageSync(2.0);
let imageScaledToFill = page.getImageSync(1300, 1800);

let newDocument = page.exportSync('path-to-new-document.pdf');
newDocument.addPageSync(document.getPageSync(3));
newDocument.addPagesSync(document, 0, 10, 1);

image.fitSync(100, 100).saveSync('path.jpg');
image.cropSync(100, 100).saveSync('path.jpg');
image.cropSync(0, 0, 100, 100).saveSync('path.jpg');
image.cropSync(100, 100, {
  vertical: 'bottom',
  horizontal: 'right'
}).saveSync('path.jpg');

image.saveSync('path.jpeg', 'jpg');

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

```js

let title = document.getInfoSync('Title');
let title1 = document.getTitleSync(); //The same of getInfo
let author = document.getAuthorSync();
let subject = document.getSubjectSync();
let keywords = document.getKeywordsSync();

```

#### Number of pages

```js

let numberOfPages = document.pagesCountSync();

```

#### Add pages to document

```js

document.addPageSync(page); //PDFPage to end of file
document.addPageSync('path.pdf', 0, 0); // add page (second) from path (first) at index (third)  

document.addPagesSync('path.pdf'); //Copy all pages from path to end of document
document.addPagesSync(otherDocument); //Copy all pages from PDFDocument
document.addPagesSync(otherDocument, 0); //atIndex
document.addPagesSync(otherDocument, 0, 10, 0); //start, end, atIndex

```

#### Save document

```js

document.saveSync(); //save current document
document.saveSync('path.pdf') //save as

```

#### Get page

```js

let page = document.getPageSync(0);

```

#### Get crop box rect

```js

page.getRectSync();

```

#### Get scale to fill

```js

page.getAspectFillScaleSync(100, 100); //width, height

```

#### Get scale to fit

```js

page.getAspectFitScaleSync(100, 100); //width, height

```

#### Get text

```js

page.getTextSync();

```

#### Extract page

```js

let doc = page.extractSync('/path/to/save');

```

#### Create image

```js

const scale = 2;

let image = page.getImageSync();
let image1 = page.getImageSync(scale); //scaled
let image2 = page.getImageSync(500, 500); //width, height - crop on center

```

#### Fit image

```js

image.fitSync(100, 100).saveSync('/path/to/save');

```

#### Crop image

```js

image.cropSync(301, 301).saveSync('/path/to/save');

```

#### Save image

```js

image.saveSync('/path/to/save');

```

Known issues
------------
Before install this module, check whether jvm is installed. To compile this module you need to install JDK.

Not implemented yet
------------
  - Working with Encrypting and signing PDFs
  - Support to create PDF
