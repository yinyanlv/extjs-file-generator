let fs = require('fs');
let path = require('path');

let config = require('./config');
let compiler = require('./lib/compiler');
let creator = require('./lib/creator');
let utils = require('./lib/utils');
let pageMap = require('./extjsConfig');

let moduleNames = utils.getNeedCreateModuleList(pageMap);
let totalCount = moduleNames.length;
let curCount = 0;

for (let name of moduleNames) {
  creator.writeFileByModuleName(name, 'var a = 2;', function () {

    curCount++;
    console.log('*** INFO: ' + name + ' has created! ***  ---' + (curCount / totalCount * 100).toFixed(2) + '%---');

    if (curCount === totalCount) console.log('\ncompleted!!!');
  });
}
