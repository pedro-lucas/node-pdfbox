const job = require('./job');
const java = require('../../lib/java').getJavaInstance();

try {
  job.printSync();
}catch(err) {
  console.error(err);
}
