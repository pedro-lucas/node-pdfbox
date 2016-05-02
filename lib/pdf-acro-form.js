'use strict';

const when = require('when');

module.exports = function(obj) {

  const callGetFieldsSync = obj.getFieldsSync;

  obj.getFieldsSync = function() {
    return callGetFieldsSync.apply(obj, arguments).toArraySync();
  };

  obj.getFields = function() {
    return when.promise(function(resolve, reject) {
      obj.getFieldsPromise.apply(obj, arguments)
      .then(function(list) {
        resolve(list.toArraySync());
      })
      .catch(reject);
    }.bind(this));
  };

  return obj;

};
