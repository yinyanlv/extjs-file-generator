let fs = require('fs');
let path = require('path');

let config = require('./config');
let compiler = require('./lib/compiler');
let creator = require('./lib/creator');
let utils = require('./lib/utils');
let pageMap = require('./extjsConfig');

let compilerCacheList = [];

for (let templatePath of config.templatePathList) {
  creator.readFile(templatePath, (data) => {
    let result = compiler.compile(data);

    compilerCacheList.push(result);

    let moduleNames = utils.getNeedCreateModuleList(pageMap, compilerCacheList);
    let totalCount = moduleNames.length;
    let createdCount = 0;

    for (let name of moduleNames) {
      creator.writeFileByModuleName(name, compiler.render(compilerCacheList[0].template, name), function () {

        createdCount++;
        console.log('*** INFO: ' + name + ' has created! ***  ---' + (createdCount / totalCount * 100).toFixed(2) + '%---');

        if (createdCount === totalCount) console.log('\ncompleted!!!');
      });
    }
  });
}

