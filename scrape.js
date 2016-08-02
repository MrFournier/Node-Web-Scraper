var $ = require('cheerio');
var request = require('request');
var fs = require('fs');

var domain = 'http://substack.net/images/';

function gotHTML(err, resp, html) {
  if (err) return console.error(err)
  var parsedHTML = $.load(html)
  var filePermissions = [];
  var imageURLs = [];
  var str = "";

  parsedHTML('a').map(function(i, link) {
    var href = $(link).attr('href');
    imageURLs.push(href);
  });

  parsedHTML('code').map(function(i, code){
    var permission = $(code).text();
    // Two seperate ways of scrapping the file permissions to the csv
    // if (permission != "" && !permission.match(/[\d]/)){
    //   filePermissions.push(permission);
    // }
    if (!(i % 2)){
      filePermissions.push(permission);
    }
  });

  var str = "";
  for (i = 0; i < imageURLs.length; i++){
    str += (filePermissions[i] + ',');
    str += (imageURLs[i] + ',');
    var splitStr = imageURLs[i].split(/\./);
    var strNew = "\n"
    if (splitStr.length > 1){
      strNew = splitStr[splitStr.length - 1] + strNew;
    }
    str += (strNew); 
  }

  fs.writeFile('images.csv', str, function(err){
    if (err){
      return console.log(err);
    }
  });
};

request(domain, gotHTML);
