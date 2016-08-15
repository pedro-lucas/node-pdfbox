'use strict';

const java = require('java');
const path = require('path');

java.options.push('-Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider');
java.options.push('-Djava.awt.headless=true');
java.options.push('-Xmx1024m');

java.classpath.push(path.resolve(__dirname, "..", "src-library/jai-imageio-core-1.3.1.jar"));
java.classpath.push(path.resolve(__dirname, "..", "src-library/jai-imageio-jpeg2000-1.3.0.jar"));
java.classpath.push(path.resolve(__dirname, "..", "src-library/levigo-jbig2-imageio-1.6.5.jar"));
java.classpath.push(path.resolve(__dirname, "..", "src-library/pdfbox-app-2.0.0.jar"));
java.classpath.push(path.resolve(__dirname, "..", "out/production/node-pdfbox"));

java.asyncOptions = {
  asyncSuffix: 'Async',
  syncSuffix: "Sync",
  promiseSuffix: 'Promise',
  promisify: require("when/node").lift
};

exports.getJavaInstance = function() {
    return java;
}
