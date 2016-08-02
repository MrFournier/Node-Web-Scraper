var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

request('http://substack.net/images/', function(err, response, body){
  if (!err && response.statusCode == 200){
    response.pipe(fs.createWriteStream('images.csv'))
  }
});

// request('http://substack.net/images/').pipe(fs.createWriteStream('images.csv'));
