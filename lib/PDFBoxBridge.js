'use strict';

const java = require('java');

java.classpath.push("./pdfbox.jar");

var fPath = java.newInstanceSync('java.io.File', '/Users/PedroLucas/Desktop/DevOps Dummies.pdf');
var doc = java.callStaticMethodSync("org.apache.pdfbox.pdmodel.PDDocument", "load", fPath);

console.log('number of pages', doc.getNumberOfPagesSync());

//console.log('number of pages', java.callMethodSync(doc, 'getNumberOfPages'));
