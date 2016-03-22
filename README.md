Node PDFBox
=======

node-pdfbox is a bridge library to manipulate PDF based on PDFBox (https://pdfbox.apache.org/)

Installation
------------

### Dependencies

This module require JVM configured on host machine to work. When you use this module with nw.js you need to specify this requisite on installation process.

```
bower install --save node-pdfbox
```

Features
-------

1. Document
    * [Load document](#load-document)
    * [Get meta information](#get-meta-information)
    * [Number of pages](#number-of-pages)
    * [Get page](#list-of-pages)
    * [Add pages to document](#add-pages)
    * [Save](#save-document)
2. Page
    * [Get crop box rect](#get-crop-box-rect)
    * [Get text](#get-text)
    * [Create image](#create-image)
    * [Extract page](#extract-page)
    * [Get scale to fit](#scale-to-fit)
    * [Get scale to fill](#scale-to-fill)
3. Page image
    * [Fit image](#fit-image)
    * [Crop image](#crop-image)
    * [Save](#save-image)

Not implemented yet
------------
  - Working with Encrypting and signing PDFs
  - Support to create PDF
