
// TODO JStyle is supposed to be an object that contains multiple classes and the classes adds the bindings

export default class JStyle1Basic {
  id;
  stylesheet;
  styleClasses;

  constructor(id, options = {}) {
    this.id = id;
    this.styleClasses = [];

    this.stylesheet = document.createElement("style");
    this.stylesheet.id = "CSSOM_JStyle_" + id;

    this.appendToHtml(options.container);
  }

  /**
   *
   * @param {Element} dom
   */
  appendToHtml(dom) {
    if (dom) {
      dom.appendChild(this.stylesheet);
      return;
    }
    document.head.insertAdjacentElement("afterbegin", this.stylesheet);
  }

  updateStylesheet() {
    // CSSOM
    //https://dev.to/karataev/set-css-styles-with-javascript-3nl5

    while (this.stylesheet.sheet.rules.length > 0) {
      this.stylesheet.sheet.removeRule(0);
    }

    // console.log("sheet before",this.stylesheet.sheet);
    for (var i = 0; i < this.styleClasses.length; ++i) {
      // console.log(1);
      this.stylesheet.sheet.insertRule(this.styleClasses[i].getAsText());
    }
    // console.log("sheet after",this.stylesheet.sheet);
  }

  addJStyleClass(jstyleClass) {
    this.styleClasses.push(jstyleClass);
  }
}
