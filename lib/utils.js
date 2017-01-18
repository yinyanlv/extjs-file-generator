let path = require('path');

let config = require('../config');

class Utils {

  /**
   * 将字符串全部小写
   *
   * @param str
   * @returns {string}
   */
  getLowerCase(str = '') {

    return str.trim().toLowerCase();
  }

  /**
   * 将字符串小驼峰化
   *
   * @param str
   * @returns {string}
   */
  getLittleCamelCase(str = '') {

    str = str.trim();

    return str ? str = str.replace(/^\w/, str[0].toLowerCase()) : '';
  }

  /**
   * 将字符串大驼峰化
   *
   * @param str
   * @returns {string}
   */
  getBigCamelCase(str = '') {

    str = str.trim();

    return str ? str = str.replace(/^\w/, str[0].toUpperCase()) : '';
  }

  /**
   * 得到字符串模式
   *
   * @param str
   * @returns {'none' | 'lower' ｜ 'little-camel' | 'big-camel'}
   */
  getStringMode(str = '') {

    if (!str) return 'none';

    if (/[A-Z]/g.test(str)) {

      return str[0] === str[0].toLowerCase() ? 'little-camel' : 'big-camel';
    } else {

      return 'lower';
    }
  }

  /**
   * 根据字符串模式，转换字符串
   *
   * @param mode
   * @param str
   * @returns {*}
   */
  convertByStringMode(mode = '', str = '') {

    switch (mode) {
      case 'lower':
        return this.getLowerCase(str);
        break;
      case 'little-camel':
        return this.getLittleCamelCase(str);
        break;
      case 'big-camel':
        return this.getBigCamelCase(str);
        break;
      default:
        return str;
    }
  }

  /**
   * 根据extjsConfig得到需要创建的模块
   *
   * @param pageMap
   * @returns {Array}
   */
  getNeedCreateModuleList(pageMap) {
    let result = [];

    if (!pageMap) return result;

    let templateMap = config.templateMap;

    for (let key in pageMap) {
      let moduleObj = pageMap[key];

      if (!moduleObj) return result;

      let viewportSec = moduleObj.viewport.replace(/\.Viewport$/, '');

      for (let key in templateMap) {
        if (templateMap[key]) {
          switch (key) {
            case 'controller':
              result.push(config.namespace + '.controller.' + moduleObj.controller);
              break;
            case 'viewport':
              result.push(config.namespace + '.view.' + viewportSec + '.Viewport');
              break;
            case 'query':
              result.push(config.namespace + '.view.' + viewportSec + '.Query');
              break;
            case 'grid':
              result.push(config.namespace + '.view.' + viewportSec + '.Grid');
              break;
            case 'edit':
              result.push(config.namespace + '.view.' + viewportSec + '.Edit');
              break;
            case 'model':
              result.push(config.namespace + '.model.' + moduleObj.controller);
              break;
            case 'store':
              result.push(config.namespace + '.store.' + moduleObj.controller);
              break;
            default:
          }
        }
      }
    }

    return result;
  }

  /**
   * 根据extjs模块名，得到文件夹层级字符串数组
   *
   * 如：'App.view.a.b.c' => ['App', 'view', 'a', 'b', 'c']
   *
   * @param moduleName
   * @returns {*}
   */
  getHierarchyList(moduleName = '') {

    if (!moduleName) return [];

    return moduleName.split('.');
  }

  /**
   * 根据extjs模块名，得到文件夹层级路径，不包括namespace
   *
   * @param moduleName
   * @returns {string}
   */
  getHierarchyPath(moduleName) {

    let sections = this.getHierarchyList(moduleName);

    return path.join(...sections.slice(1, sections.length));
  }

  /**
   * 根据extjs模块名，得到文件名
   *
   * @param moduleName
   * @returns {*}
   */
  getFileName(moduleName = '') {

    if (!moduleName) return moduleName;

    let hierarchies = this.getHierarchyList(moduleName);

    return hierarchies[hierarchies.length - 1];
  }

  /**
   * 判断是否是视图文件
   *
   * 'App.view.***' => true
   * 'App.model.***' => false
   *
   * @param moduleName
   * @returns {boolean}
   */
  isViewFile(moduleName = '') {

    return moduleName.includes('.view.');
  }
}

module.exports = new Utils();