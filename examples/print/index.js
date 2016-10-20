const job = require('./job');
const java = require('../../lib/java').getJavaInstance();

console.log('asdads');

try {
  job.printSync();
}catch(err) {
  console.error(err);
}
