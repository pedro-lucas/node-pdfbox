const job = require('./job');

try {
  job.printSync();
}catch(err) {
  console.error(err);
}
