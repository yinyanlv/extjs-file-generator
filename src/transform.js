class Transform {

  getLowerCase(str = '') {

    return str.trim().toLowerCase();
  }

  getLittleCamelCase(str = '') {

    str = str.trim();

    return str ? (str[0] = str[0].toLowerCase()) : '';
  }

  getBigCamelCase(str = '') {

    str = str.trim();

    return str ? (str[0] = str[0].toUpperCase()) : '';
  }
}

module.exports = new Transform();