let path = require('path');
let fs = require('fs');

let utils = require('./utils');
let config = require('../config');

class Creator {

  /**
   * 根据路径，递归创建文件夹
   *
   * @param dirPath
   * @param callback
   */
  createFolder(dirPath = '', callback) {

    if (!dirPath) return;

    fs.exists(dirPath, (isExist) => {

      if (isExist) {
        callback && callback();
      } else {

        this.createFolder(path.dirname(dirPath), () => {

          fs.mkdir(dirPath, callback);
        });
      }
    });
  }

  /**
   * 根据路径和数据，创建文件
   *
   * @param filePath
   * @param data
   * @param callback
   */
  writeFile(filePath, data, callback) {

    fs.writeFile(filePath, data, 'utf-8', (err) => {

      if (err) console.log(err);

      callback && callback();
    });
  }

  /**
   * 根据extjs模块名和数据，创建文件
   *
   * @param moduleName
   * @param data
   * @param callback
   */
  writeFileByModuleName(moduleName, data = '', callback) {

    let filePath = path.join(config.destBasePath, utils.getHierarchyPath(moduleName)) + '.js';

    this.createFolder(path.dirname(filePath), () => {

      this.writeFile(filePath, data, callback)
    });
  }

  /**
   * 根据路径，读取文件
   *
   * @param filePath
   * @param callback
   */
  readFile(filePath, callback) {

    fs.readFile(filePath, 'utf-8', (err, data) => {

      if (err) console.log(err);

      callback && callback(data);
    });
  }
}

module.exports = new Creator();