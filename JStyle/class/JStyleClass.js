import { ElementAttrs, filterElements } from "../elements/ElementArray.js";
import { bindElementStyle, unbindElementStyle } from "../elements/ElementBinding.js";
import { getRandomStr } from "../funcs/StrFuncs.js";
import QueryOptions from "../query/QueryOptions.js";

export default class JStyleClass {
	constructor(className, unique = false) {
    this.className = className;
    if (unique) {
      this.className += "_" + getRandomStr();
    }
    this.style = {};
  }
  
  getAsText() {
    var styleText = "." + this.className + " {";
    for (let key in this.style) {
      if (typeof this.style[key] == "function") {
        styleText += key + ": " + this.style[key](this.style) + "; \r\n";
      } else {
        styleText += key + ": " + this.style[key] + "; \r\n";
      }
    }
    styleText += "}\r\n";
    // console.log("styleText", styleText);
    return styleText;
  }

  setAttr(attr, value) {
    this.style[attr] = value;
  }

  /**
   * searches html elements by parameters and set className to this
   * @param {object} elementAttrs will look for elements with those parameters.
   */
  queryBind(elementAttrs, options = {}) {
    const attrs = new ElementAttrs(elementAttrs); // million times - 33ms - excellent

    var elements = QueryOptions.getElements(options); // 1000 times - 8ms - good enough

    // id - 1000 times - 8ms - not great
    // localName and id - 1000 times - 5ms - ok
    elements = filterElements(elements, attrs); 
    
    // 1000 times - 11ms - not great
    for (let i = 0, n = elements.length; i < n; i++) {
      this.bindElementStyle(elements[i]);
    }
  }

  /**
   * searches html elements by parameters and set className to this
   * @param {object} elementAttrs will look for elements with those parameters.
   */
  queryUnbind(elementAttrs, options = {}) {
    const attrs = new ElementAttrs(elementAttrs);

    let elements = QueryOptions.getElements(options);
    elements = filterElements(elements, attrs);

    for (let i = 0, n = elements.length; i < n; i++) {
      this.unbindElementStyle(elements[i]);
    }
  }
	
  bindElementStyle = (element) => bindElementStyle(element, this);
  unbindElementStyle = (element) => unbindElementStyle(element,this);
  
  setWidth = (value) => this.setAttr("width", value);
  setHeight = (value) => this.setAttr("height", value);
  setColor = (value) => this.setAttr("color", value);
  setBackgroundColor = (value) => this.setAttr("background-color", value);
}