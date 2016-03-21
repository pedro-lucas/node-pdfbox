'use strict';

const java = require('java');

java.options.push('-Djava.awt.headless=true');
java.options.push('-Xmx1024m');

java.classpath.push("./src-library/jai-imageio-core-1.3.1.jar");
java.classpath.push("./src-library/levigo-jbig2-imageio-1.6.5.jar");
java.classpath.push("./src-library/pdfbox-2.0.0.RC3.jar");
java.classpath.push("./out/production/node-pdfbox");

java.asyncOptions = {
  asyncSuffix: undefined,
  syncSuffix: "Sync",
  promiseSuffix: "Promise",
  promisify: require("when/node").lift
};

exports.getJavaInstance = function() {
    return java;
}
