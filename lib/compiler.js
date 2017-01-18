let config = require('../config');
let utils = require('./utils');

const MODULE_NAME_REGEX = /Ext\.define\(["']([a-zA-Z.]+)["']/g;

class Compiler {

  getModuleNames(templateStr = '') {

    return MODULE_NAME_REGEX.exec(templateStr)[1];
  }

  compile(templateStr = '') {

    if (!templateStr) return templateStr;

    let moduleName = this.getModuleNames(templateStr);
    let hierarchyList = utils.getHierarchyList(moduleName);
    let curNamespace = hierarchyList[0];
    let curModuleType = hierarchyList[1];
    let curFilename = hierarchyList[hierarchyList.length - 1];
    let sectionList = hierarchyList.slice(2, hierarchyList.length - 1);
    let sectionStr = sectionList.join('.');

    templateStr = templateStr.replace(eval('/([\'\"])' + curNamespace + '\\./g'), ($, $0) => {  // 替换命名空间
      return $0 + '${namespace}.';
    });

    templateStr = templateStr.replace(eval('/\\$\\{namespace\\}\\.' + curModuleType + '\\./g'), ($) => {  // 替换模块类型
      return '${namespace}.${moduleType}.';
    });

    templateStr = templateStr.replace(eval('/\\.' + curFilename + '([\'\"])/g'), ($, $0) => {  // 替换文件名
      return '.${fileName}' + $0;
    });

    templateStr = templateStr.replace(eval('/\\.' + sectionStr + '\\./g'), ($) => {  // 替换模块名中间部分
      return '.${section}.';
    });

    for (let [index, name] of sectionList.entries()) {

      templateStr = templateStr.replace(eval('/(' + name + ')/ig'), () => {  // 替换别名

        return `\${section_${index}}`;
      });
    }

    return {
      moduleName,
      template: templateStr,
      moduleType: curModuleType,
      fileName: curFilename
    };
  }

  render(compiledStr = '', moduleName) {

    if (!compiledStr) return compiledStr;

    let hierarchyList = utils.getHierarchyList(moduleName);
    let curNamespace = hierarchyList[0];
    let curModuleType = hierarchyList[1];
    let curFilename = hierarchyList[hierarchyList.length - 1];
    let sectionList = hierarchyList.slice(2, hierarchyList.length - 1);
    let sectionStr = sectionList.join('.');

    compiledStr = compiledStr.replace(/\$\{namespace\}/g, curNamespace);  // 替换命名空间

    compiledStr = compiledStr.replace(/\$\{moduleType\}/g, curModuleType);  // 替换模块类型

    compiledStr = compiledStr.replace(/\$\{fileName\}/g, curFilename);  // 替换文件名

    compiledStr = compiledStr.replace(/\$\{section\}/g, sectionStr);  // 替换模块名中间部分

    for (let [index, name] of sectionList.entries()) {

      compiledStr = compiledStr.replace(eval('/\\$\\{section_'+ index +'\\}/g'), utils.getLowerCase(name));  // 替换别名
    }

    return compiledStr;
  }
}

module.exports = new Compiler();

