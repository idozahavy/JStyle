// TODO JStyle is supposed to be an object that contains multiple classes and the classes adds the bindings

import JStyleClass from "./class/JStyleClass.js";

export default class JStyle1Basic {
  id;
  stylesheet;
  styleClasses;

  constructor(id, options = {}) {
    this.id = id;
    this.styleClasses = [];
    this.disabled = false;

    this.stylesheet = document.createElement("style");
    this.stylesheet.id = "CSSOM_JStyle_" + id;

    this.appendToHtml(options.container, options);
  }

  /**
   *
   * @param {Element} dom
   * @param {{position:["beforebegin","afterbegin","beforeend","afterend"]}}
   * https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
   */
  appendToHtml(dom, options = {}) {
    dom = dom || document.head;
    let position = options.position||"afterbegin";   
    console.log(position);
    document.head.insertAdjacentElement(position, this.stylesheet);
  }

  isReady() {
    return this.stylesheet.sheet;
  }

  toggle() {
    this.disabled = !this.disabled;
    this.stylesheet.disabled = this.disabled;
  }

  disable() {
    this.disabled = true;
    this.stylesheet.disabled = this.disabled;
  }

  enable() {
    this.disabled = false;
    this.stylesheet.disabled = this.disabled;
  }

  updatePage() {
    // CSSOM
    //https://dev.to/karataev/set-css-styles-with-javascript-3nl5

    if (!this.isReady()){
      this.appendToHtml();
    }

    while (this.stylesheet.sheet.rules.length > 0) {
      this.stylesheet.sheet.deleteRule(0);
    }
    // console.log(this.stylesheet.sheet);
    
    var i;
    for (i = 0; i < this.styleClasses.length; ++i) {
      this.stylesheet.sheet.insertRule(this.styleClasses[i].getAsText());
    }
  }

  isClassNameExist(className) {
    var i;
    for (i = 0; i < this.styleClasses.length; i++) {
      if (this.styleClasses[i].className == className) {
        return true;
      }
    }
    return false;
  }

  removeJStyleClassByClassName(className) {
    var i;
    for (i = 0; i < this.styleClasses.length; i++) {
      if (this.styleClasses[i].className == className) {
        this.styleClasses.splice(i, 1);
        return true;
      }
    }
    return false;
  }

  /**
   *
   * @param {JStyleClass} jstyleClass
   */
  addJStyleClass(jstyleClass) {
    if (this.isClassNameExist(jstyleClass.className)) {
      console.warn(`JStyle '${this.id}' - replacing '${jstyleClass.className}' class, class-name already exists`);
      this.removeJStyleClassByClassName(jstyleClass.className);
    }
    this.styleClasses.push(jstyleClass);
  }

  newClass(className, unique) {
    let newClass = new JStyleClass(className, unique);
    while (unique && this.isClassNameExist(newClass.className)) {
      newClass = new JStyleClass(className, unique);
    }
    this.addJStyleClass(newClass);
    return newClass;
  }
}
