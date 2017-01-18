let path = require('path');
let fs = require('fs');

class Creator {

  createFolder(dirPath = '', callback) {

    if (!dirPath) return;

    fs.exists(dirPath, (isExist) => {

      if (isExist) {
        callback && callback();
      } else {

        this.createFolder(path.dirname(dirPath), () => {

          fs.mkdir(dirPath, callback);
        })
      }
    });
  }

  createFile() {

  }
}

module.exports = new Creator();