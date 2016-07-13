const exec = require('child_process').exec;
const path = require('path');
const javahome = require('find-java-home');

const command = (command) => {
  let child = exec(command, function (error, stdout, stderr) {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(stdout, stderr);
  });
};

javahome((err, home) => {
  if(err) {
    console.error(err);
    exit(1);
  }
  command(path.join(home.trim(), 'bin', 'javac') + ' -classpath .:"' + path.join(__dirname, 'src-library/*') + '" -d "' + path.join(__dirname, 'out/production/node-pdfbox') + '" ' + path.join(__dirname, 'src/main/java/br/com/appmania/*.java'));
});
