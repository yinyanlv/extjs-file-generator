let config = require('../config');

class Resolve {

  getHierarchyArray(str = '') {

    if (!str) return [];

    let sections = str.split('.');

    return sections.filter((item) => {
      return config.namespace === item ? false : true;
    });
  }
}

module.exports = new Resolve();