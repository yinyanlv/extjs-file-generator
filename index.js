let fs = require('fs');
let path = require('path');

let config = require('./config');
let compiler = require('./lib/compiler');
let creator = require('./lib/creator');

let pageMap = require('./extjsConfig');

fs.readFile('./temp/Viewport.js', 'utf-8', (err, data) => {
  fs.writeFile('./destaaa/Viewport.js', compiler.compile(data), 'utf-8', (err) => {
    console.log('ok');
  });
});

creator.createFolder('./a/b/c/d');
