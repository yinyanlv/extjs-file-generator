let utils = require('./utils');

const MODULE_NAME_REGEX = /Ext\.define\(["']([a-zA-Z.]+)["']/g;

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
      let fileName = utils.getFileName(name);
      let nameRegex = eval('/' + fileName + '/ig');

      templateStr = templateStr.replace(nameRegex, (str) => {

        return `\${${utils.convertByStringMode(utils.getStringMode(str), utils.getStringMode(str))}}`;
      });

      return templateStr;
    }
  }
}

module.exports = new Compiler();

