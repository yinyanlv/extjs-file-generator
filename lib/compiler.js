let config = require('../config');
let utils = require('./utils');

const MODULE_NAME_REGEX = /Ext\.define\(["']([a-zA-Z.]+)["']/g;

class Compiler {

  /**
   * 解析模板字符串，得到extjs模块名
   *
   * @param templateStr
   * @returns {*}
   */
  getModuleName(templateStr = '') {

    return MODULE_NAME_REGEX.exec(templateStr)[1];
  }

  /**
   * 根据extjs模块名，得到渲染需要的元素
   *
   * @param moduleName
   * @returns {[]}
   */
  getCompileNeed(moduleName) {
    let hierarchyList = utils.getHierarchyList(moduleName);
    let namespace = hierarchyList[0];
    let moduleType = hierarchyList[1];
    let filename = hierarchyList[hierarchyList.length - 1];
    let sectionList = hierarchyList.slice(2, hierarchyList.length - 1);
    let sectionStr = sectionList.join('.');

    return [
      namespace,
      moduleType,
      filename,
      sectionList,
      sectionStr
    ];
  }

  /**
   * 将原始模板转换为中间模板
   *
   * @param templateStr
   * @returns {*}
   */
  compile(templateStr = '') {

    if (!templateStr) return templateStr;

    let moduleName = this.getModuleName(templateStr);
    let [
      curNamespace,
      curModuleType,
      curFilename,
      sectionList,
      sectionStr
    ] = this.getCompileNeed(moduleName);

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

    for (let [index, name] of sectionList.reverse().entries()) {

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

  /**
   * 根据中间模板和模块名，创建extjs文件
   *
   * @param compiledStr
   * @param moduleName
   * @returns {string}
   */
  render(compiledStr = '', moduleName) {

    if (!compiledStr) return compiledStr;

    let [
      curNamespace,
      curModuleType,
      curFilename,
      sectionList,
      sectionStr
    ] = this.getCompileNeed(moduleName);

    compiledStr = compiledStr.replace(/\$\{namespace\}/g, curNamespace);  // 替换命名空间

    compiledStr = compiledStr.replace(/\$\{moduleType\}/g, curModuleType);  // 替换模块类型

    compiledStr = compiledStr.replace(/\$\{fileName\}/g, curFilename);  // 替换文件名

    compiledStr = compiledStr.replace(/\$\{section\}/g, sectionStr);  // 替换模块名中间部分

    for (let [index, name] of sectionList.reverse().entries()) {

      compiledStr = compiledStr.replace(eval('/\\$\\{section_'+ index +'\\}/g'), utils.getLowerCase(name));  // 替换别名
    }

    return compiledStr;
  }
}

module.exports = new Compiler();

