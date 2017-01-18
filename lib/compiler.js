let config = require('../config');
let utils = require('./utils');

const MODULE_NAME_REGEX = /Ext\.define\(["']([a-zA-Z.]+)["']/g;
const EXCLUDE_LIST = [config.namespace, 'controller', 'model', 'store', 'view'];

class Compiler {

  getModuleNames(templateStr = '') {
    let moduleNames = [];
    let temp;

    while (temp = MODULE_NAME_REGEX.exec(templateStr)) {
      moduleNames.push(temp[1]);
    }

    return moduleNames;
  }

  compile(templateStr = '') {

    if (!templateStr) return templateStr;

    let moduleNames = this.getModuleNames(templateStr);

    for (let name of moduleNames) {
      let hierarchyList = utils.getHierarchyList(name);
      let replaceQueueList = [
        config.namespace,
        'module-section',
        'alias'
      ];

      for (let mode of replaceQueueList) {

        for (let [index, secName] of hierarchyList.entries()) {
          let secNameRegex;

          switch (mode) {
            case config.namespace:
              secNameRegex = eval('/[\'\"](' + secName + ')\\.');  // 命名空间
              break;
            case 'module-section':
              secNameRegex = eval('/\\.(' + secName + ')\\./ig');  // 替换模块名中间部分
              break;
            case 'alias':
            default:
              secNameRegex = eval('/(' + secName + ')/ig');  // 替换别名部分
          }

          templateStr = templateStr.replace(secNameRegex, ($, $0) => {
            let str = '';

            switch (mode) {
              case config.namespace:
                str = config.namespace;
                break;
              case 'module-section':
                str = '${module-section}';
                break;
              case 'alias':
              default:
                str = `${index}`;
            }

            return $.replace($0, str);
          });
        }
      }
    }

    return templateStr;
  }

  render(compiledStr, moduleName) {

  }
}

module.exports = new Compiler();

