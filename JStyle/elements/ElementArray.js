/**
 *
 * @param {Element} element
 * @param {ElementAttrs} attrs
 */
export function isElementMatchAttrs(element, attrs) {
  var key;
  for (key in attrs) {
    // if (!(element.hasAttribute(key) && element.getAttribute(key) == attrs[key]) && !(key in element && element[key] == attrs[key])) {
      if (element[key] != attrs[key] && element.getAttribute(key) != attrs[key]) {
        // if (!(element.attributes[key] == attrs[key]) && !(element[key] == attrs[key])) {
      return false;
    }
  }

  // let attrValue;
  // for (let key in attrs) {
  //   attrValue = attrs[key];
  //   if (!(element.hasAttribute(key) && element.getAttribute(key) == attrValue) && !(key in element && element[key] == attrValue)) {
  //     return false;
  //   }
  // }

  // const keys = Object.getOwnPropertyNames(attrs);
  // for (let i = 0, n = keys.length; i < n; i++) {
  //   if (!(element.hasAttribute(keys[i]) && element.getAttribute(keys[i]) == keys[i]) && !(keys[i] in element && element[keys[i]] == attrs[keys[i]])) {
  //     return false;
  //   }
  // }

  // const entries = Object.entries(attrs);
  // for (let i = 0, n = entries.length; i < n; i++) {
  //   if (!(element.hasAttribute(entries[i][0]) && element.getAttribute(entries[i][0]) == entries[i][0]) && !(entries[i][0] in element && element[entries[i][0]] == entries[i][1])) {
  //     return false;
  //   }
  // }

  return true;
}

/**
 *
 * @param {Array<Element>} elements
 * @param {ElementAttrs} options
 */
export function filterElements(elements, options) {
  // return elements.filter((element) => {
  // 	return isElementMatchAttrs(element, options.attrsList);
  // });
  var index = 0;
  var result = new Array(elements.length); // 1
  // let result = []; // 2
  for (let i = 0; i < elements.length; i++) {
    if (isElementMatchAttrs(elements[i], options)) {
      result[index++] = elements[i]; // 1
      // result.push(elements[i]); // 2
    }
  }
  result.length = index; // 1
  return result;
}

export class ElementAttrs {

  localName;
  id;

  /**
   *
   * @param {*} args
   */
  constructor(args) {
    ElementAttrs.getAttrsAliasedArray(args, this);
  }

  /**
   * Converts keys by aliases dictionary to correspond to element attributes
   * @param {object} attrsObject element attributes that will transfer to the aliased attributes for the actual element
   * @param {object} output Object to put all the converted keys and values in
   * @return {object}
   */
  static getAttrsAliasedArray(attrsObject, output = {}) {
    const aliasedArgsArray = output;
    var key;
    for (key in attrsObject) {
      if (key in this.aliases && this.aliases[key]) {
        aliasedArgsArray[this.aliases[key]] = attrsObject[key];
      } else {
        aliasedArgsArray[key]= attrsObject[key];
      }
    }
    return aliasedArgsArray;
  }

  static aliases = {
    tag: "localName",
    xss: undefined
  };
}
