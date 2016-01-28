var path = require('path'),
    fs = require('fs'),
    http = require('http'),
    childProcess = require('child_process');

// Get the path to the phantomjs application
function getPhantomFileName(callback) {
  var nodeModulesPath = path.join(__dirname, 'node_modules');
  fs.exists(nodeModulesPath, function(exists) {
    if (exists) {
      return callback(path.join(__dirname, 'node_modules','phantomjs', 'bin', 'phantomjs'));
    }
    callback(path.join(__dirname, 'phantomjs'));
  });
}

// Call the phantomJS script
function runPhantom(scriptName, callback) {
  getPhantomFileName(function(phantomPath) {
    var outputData = [];
    var error = null;
    var childArgs = [
      path.join(__dirname, scriptName)
    ];

    // This option causes the shared library loader to output
    // useful information if phantomjs can't start.
    process.env['LD_WARN'] = 'true';

    // Tell the loader to look in this script's directory for
    // the shared libraries that Phantom.js 2.0.0 needs directly.
    // This shouldn't be necessary once
    // https://github.com/ariya/phantomjs/issues/12948
    // is fixed.
    process.env['LD_LIBRARY_PATH'] = __dirname;

    console.log('Calling phantomJS: ', phantomPath, childArgs);

    var ps = childProcess.execFile(phantomPath, childArgs);
    
    ps.stdout.on('data', function (data) { // register one or more handlers
      console.log(data);
      outputData.push(data);
    });

    ps.stderr.on('data', function (data) {
      console.log('phantom error  ---:> ' + data);
      error = new Error(data);
    });

    ps.on('exit', function (code) {
      console.log('child process exited with code ' + code);
      callback(error, outputData);
    });
  });
}

// Entry Point
exports.handler = function( event, context ) {
  // Execute the phantomJS call and exit
  runPhantom('phantomjs-script.js', context.done);
}
