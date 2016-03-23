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
const Document = require('node-pdfbox');

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

```

#### Number of pages

```js

```

#### Add pages to document

```js

```

#### Save document

```js

```

#### Get page

```js

```

#### Get crop box rect

```js

```

#### Get scale to fill

```js

```

#### Get scale to fit

```js

```

#### Get text

```js

```

#### Extract page

```js

```

#### Create image

```js

```

#### Fit image

```js

```

#### Crop image

```js

```

#### Save image

```js

```

Known issues
------------


Not implemented yet
------------
  - Working with Encrypting and signing PDFs
  - Support to create PDF
