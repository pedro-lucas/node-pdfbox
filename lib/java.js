'use strict';

const java = require('java');
const path = require('path');
let init = false;

exports.getJavaInstance = function(options, classpaths) {
  if(!init) {
  init = true;
  java.options.push('-Xrs');
  java.options.push('-XX:+AggressiveHeap');
  java.options.push('-Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider');
  java.options.push('-Djava.awt.headless=true');

    options = typeof options === 'string' ? [options] : options;
    classpaths = typeof classpaths === 'string' ? [classpaths] : classpaths;

    if(Array.isArray(options)) {
      options.forEach(option => {
        java.options.push(option);
      });
    }

    java.classpath.push(path.resolve(__dirname, "..", "src-library/jai-imageio-core-1.3.1.jar"));
    java.classpath.push(path.resolve(__dirname, "..", "src-library/jai-imageio-jpeg2000-1.3.0.jar"));
    java.classpath.push(path.resolve(__dirname, "..", "src-library/levigo-jbig2-imageio-1.6.5.jar"));
    java.classpath.push(path.resolve(__dirname, "..", "src-library/pdfbox.jar")); //2.0.5
    java.classpath.push(path.resolve(__dirname, "..", "out/production/node-pdfbox"));

    if(Array.isArray(classpaths)) {
      options.forEach(classpath => {
        java.classpath.push(classpath);
      });
    }

    java.asyncOptions = {
      asyncSuffix: 'Async',
      syncSuffix: "Sync",
      promiseSuffix: 'Promise',
      promisify: require("when/node").lift
    };
  }
  return java;
}


// 'use strict';

// const java = require('java');
// const path = require('path');
// let init = false;

// exports.getJavaInstance = function(options, classpaths) {
//   if(!init) {
//     init = true;
//     java.options.push('-Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider');
//     java.options.push('-Djava.awt.headless=true');
//    java.options.push('-Xrs');
//    java.options.push('-Xss1024m');
//    java.options.push('-XX:MetaspaceSize=512m');
//    java.options.push('-XX:MaxMetaspaceSize=1024m');
//    java.options.push('-XX:MaxHeapSize=2048m');
 
//    java.options.push('-XX:+AggressiveHeap');

//    java.options.push('-XX:+UseG1GC');
//    java.options.push('-XX:MaxGCPauseMillis=100');
//    java.options.push('-XX:ParallelGCThreads=40');
//    java.options.push('-XX:ConcGCThreads=10');
 
//    java.options.push('-XX:+HeapDumpOnOutOfMemoryError');
//    //java.options.push('-XX:+UseParallelGC');
//    java.options.push('-Dsun.java2d.cmm=sun.java2d.cmm.kcms.KcmsServiceProvider');
//    java.options.push('-Djava.awt.headless=true');

//     options = typeof options === 'string' ? [options] : options;
//     classpaths = typeof classpaths === 'string' ? [classpaths] : classpaths;

//     if(Array.isArray(options)) {
//       options.forEach(option => {
//         java.options.push(option);
//       });
//     }

//     java.classpath.push(path.resolve(__dirname, "..", "src-library/jai-imageio-core-1.3.1.jar"));
//     java.classpath.push(path.resolve(__dirname, "..", "src-library/jai-imageio-jpeg2000-1.3.0.jar"));
//     java.classpath.push(path.resolve(__dirname, "..", "src-library/levigo-jbig2-imageio-1.6.5.jar"));
//     java.classpath.push(path.resolve(__dirname, "..", "src-library/pdfbox.jar")); //2.0.5
//     java.classpath.push(path.resolve(__dirname, "..", "out/production/node-pdfbox"));

//     if(Array.isArray(classpaths)) {
//       options.forEach(classpath => {
//         java.classpath.push(classpath);
//       });
//     }

//     java.asyncOptions = {
//       asyncSuffix: 'Async',
//       syncSuffix: "Sync",
//       promiseSuffix: 'Promise',
//       promisify: require("when/node").lift
//     };
//   }
//   return java;
// }
