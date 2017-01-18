let fs = require('fs');
let path = require('path');

let config = require('./config');
let compiler = require('./lib/compiler');
let creator = require('./lib/creator');
let pageMap = require('./extjsConfig');


creator.createFolder('./a/b/c/d');
