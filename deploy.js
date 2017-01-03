/* global process require */
console.log('this is the process received by the deploy.js script: ', process.env.NODE_ENV);

// Since postinstall will also run when you run npm install
// locally we make sure it only runs in production
if (process.env.NODE_ENV === 'deployment') {

  // We basically just create a child process that will run
  // the production bundle command
  var child_process = require('child_process');
  child_process.exec('NODE_ENV=production webpack -p --config webpack.config.js', function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
  });
}
