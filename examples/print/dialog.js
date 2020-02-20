const job = require('./job');

job.printDialogPromise()
.then(result => {
  if(result) {
    job.printSync();
  }
})
.catch(err => {
  console.error(err);
});
