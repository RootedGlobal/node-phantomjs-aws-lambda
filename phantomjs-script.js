// Simple Javascript example
var page = require('webpage').create();
var url = 'http://phantomjs.org/';

console.log('Loading a web page: ' + url);

page.open(url, function(status) {
  var title = page.evaluate(function() {
    return document.title;
  });
  console.log('Page title is: ' + title);
  phantom.exit();
});