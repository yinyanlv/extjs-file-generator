let fs = require('fs');
let path = require('path');

let config = require('./config');
let compiler = require('./src/compiler');

fs.readFile('./temp/Viewport.js', 'utf-8', (err, data) => {
  fs.writeFile('./dest/Viewport.js', compiler.compile(data), 'utf-8', () => {
    console.log('ok');
  });
});