const job = require('./job');
const java = require('../../lib/java').getJavaInstance();

job.printDialogPromise()
.then(result => {
  if(result) {
    job.printSync();
  }
})
.catch(err => {
  console.error(err);
});
