let config = require('../config');
const STRING_MODE_REGEX = /[A-Z]/g;
const VIEW_STRING = '.view.';

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
   * 根据extjs模块名，得到文件夹层级字符串数组，不包括namespace
   * 如：'App.view.a.b.c' => ['view', 'a', 'b', 'c']
   *
   * @param str
   * @returns {*}
   */
  getHierarchyList(str = '') {

    if (!str) return [];

    let sections = str.split('.');

    return sections.filter((item) => {
      return config.namespace === item ? false : true;
    });
  }

  /**
   * 根据extjs模块名，得到文件名
   *
   * @param str
   * @returns {*}
   */
  getFileName(str = '') {

    if (!str) return str;

    let hierarchies = this.getHierarchyList(str);

    return hierarchies[hierarchies.length - 1];
  }

  /**
   * 得到字符串模式
   *
   * @param str
   * @returns {'none' : 'lower' ｜ 'little-camel' | 'big-camel'}
   */
  getStringMode(str = '') {

    if (!str) return 'none';

    if (STRING_MODE_REGEX.test(str)) {

      return str[0] === str[0].toLowerCase() ? 'little-camel' : 'big-camel';
    } else {

      return 'lower';
    }
  }

  isViewFile(str = '') {

    return str.includes(VIEW_STRING);
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
}

module.exports = new Utils();