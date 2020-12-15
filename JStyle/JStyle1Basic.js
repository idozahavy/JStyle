import {ElementAttrs, filterElements} from "./elements/ElementArray.js";
import {getRandomStr} from "./funcs/StrFuncs.js";

// TODO JStyle is supposed to be an object that contains multiple classes and the classes adds the bindings

class JStyle1BasicClass {
  constructor(className, unique = false, overwrite = false) {
    this.className = className;
    if (unique) {
      this.className += "_" + getRandomStr();
    }
    this.style = {};

    this.stylesheet = document.createElement("style");
    this.stylesheet.id = "CSSOM " + this.className;
    if (overwrite) document.body.appendChild(this.stylesheet);
    else document.head.insertAdjacentElement("afterbegin", this.stylesheet);
  }

  /**
   * searches html elements by parameters and set className to this
   * @param {object} args  will look for elements with those parameters.
   *
   * the usual parameters : 'id', 'name', 'tag', 'className'
   *
   * calculated speed = 0.042 milliseconds for 50 dives
   */
  queryBind(elementAttrs, options = {}) {
    const attrs = new ElementAttrs(elementAttrs);

    let elements;
    if (options.xss) {
      elements = Array.from(document.querySelectorAll(options.xss));
    } else {
      elements = Array.from(document.getElementsByTagNameNS("*", attrs.localName || "*"));
    }

    elements = filterElements(elements, attrs);

    for (let i = 0, n = elements.length; i < n; i++) {
      this.bindElement(elements[i]);
    }
  }

  queryUnbind(elementAttrs) {
    const attrs = new ElementAttrs(elementAttrs);

    let elements = Array.from(document.querySelectorAll("." + this.className));

    elements = filterElements(elements, attrs);

    for (let i = 0, n = elements.length; i < n; i++) {
      this.unbindElement(elements[i]);
    }
  }

  /**
   * 
   * @param {Element} element 
   */
  bindElement(element) {
    if (!element.classList.contains(this.className)) {
      element.classList.add(this.className);
    }
  }

  /**
   * 
   * @param {Element} element 
   */
  unbindElement(element) {
    element.classList.remove(this.className);
  }

  updateStylesheet() {
    // CSSOM
    //https://dev.to/karataev/set-css-styles-with-javascript-3nl5
    var styleText = "." + this.className + " {";
    for (let key in this.style) {
      if (typeof this.style[key] == "function") {
        styleText += key + ": " + this.style[key](this.style) + "; \r\n";
      } else {
        styleText += key + ": " + this.style[key] + "; \r\n";
      }
    }
    styleText += "}";
    while (this.stylesheet.sheet.rules.length > 0) {
      this.stylesheet.sheet.removeRule(0);
    }
    this.stylesheet.sheet.insertRule(styleText);
  }

  setAttr(attr, value, update = true) {
    this.style[attr] = value;
    update ? this.updateStylesheet() : null;
  }

  // addStyles(styles) {
  //   for (let style in styles) {
  //     for (let key in style) {
  //       this.setAttr(key, style[key], false);
  //     }
  //   }
  //   this.updateStylesheet();
  // }
}

export default JStyle1BasicClass;
