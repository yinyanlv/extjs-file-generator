const SPLIT_REGEX = /[a-zA-Z][a-z]*/g;

class TransformName {

  resolve(name = '') {
    let result = [];
    let temp;

    name = name.trim();

    while (temp = SPLIT_REGEX.exec(name)) {
      result.push(temp[0]);
    }

    return result;
  }

  toLowercase(name = '') {

    return name.trim().toLocaleLowerCase();
  }

  toLittleCamelCase(name) {
    let sections = this.resolve(name);
    let temp = sections.map((item, index) => {

      if (!item) return '';

      return index > 0 ? item.replace(/^\w/, (str) => str.toUpperCase()) : item.replace(/^\w/, (str) => str.toLowerCase());
    });

    return temp.join('');
  }

  toBigCamelCase(name) {
    let sections = this.resolve(name);
    let temp = sections.map((item, index) => {

      if (!item) return '';

      return item.replace(/^\w/, (str) => str.toUpperCase());
    });

    return temp.join('');
  }
}

module.exports = new TransformName();