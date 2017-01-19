let co = require('co');

let config = require('./config');
let compiler = require('./lib/compiler');
let creator = require('./lib/creator');
let utils = require('./lib/utils');
let pageMap = require('./extjsConfig');

let compilerCacheMap = {};

co(function* () {

  for (let templatePath of config.templatePathList) {

    let templateStr = yield creator.readFile(templatePath);
    let result = compiler.compile(templateStr);

    compilerCacheMap[result.moduleName] = result;
  }

  let modules = utils.getNeedCreateModuleList(pageMap, compilerCacheMap);
  let totalCount = modules.length;
  let createdCount = 0;

  for (let curModule of modules) {

    yield creator.writeFileByModuleName(
      curModule.moduleName,
      compiler.render(compilerCacheMap[curModule.templateName].template, curModule.moduleName));

    createdCount++;

    console.log('*** INFO: ' + curModule.moduleName + ' has created! ***  ---' + (createdCount / totalCount * 100).toFixed(2) + '%---');

    if (createdCount === totalCount) console.log('\ncompleted!!!');
  }
}).catch((err) => {

  console.log(err);

  console.log('\nfailed!!!')
});

