'use strict';

const java = require('./java').getJavaInstance();

class JavaObject {

  constructor(javaObject) {
    this.javaObject = javaObject;
  }

  static list() {
    let list = java.newInstanceSync("java.util.ArrayList");
    for(let i=0;i<arguments.length;i++) {
      list.addSync(arguments[1]);
    }
    return list;
  }

}

module.exports = JavaObject;
