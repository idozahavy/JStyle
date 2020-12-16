export default class QueryOptions {

	xss;
	parent;

	constructor(options){
		for (var key in options){
			this[key] = options[key];
		}
	}

  /**
   *
   * @param {QueryOptions} options
   */
  static getElements(options) {
    var parent = options.parent || document.body;
    var result = [];
    var els;
    if (options.xss) {
      els = parent.querySelectorAll(options.xss);
    } else {
      els = parent.getElementsByTagNameNS("*", options.localName || "*");
    }
    for (let i = 0; i < els.length; i++) {
      // result[i] = els[i];
      result.push(els[i]);
    }
    return result;
  }
}
