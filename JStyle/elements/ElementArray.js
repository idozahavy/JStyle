/**
 *
 * @param {Element} element
 * @param {[["key1","value1"],["key2","value2"]]} attrsArray
 */
export function isElementMatchAttrs(element, attrs) {
  for (let key in attrs) {
    if (!(element.hasAttribute(key) && element.getAttribute(key) == attrs[key]) && !(key in element && element[key] == attrs[key])) {
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
  const result = [];
  for (let i = 0, n = elements.length; i < n; i++) {
    if (isElementMatchAttrs(elements[i], options)) {
      result.push(elements[i]);
    }
  }
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
    for (const key in attrsObject) {
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
