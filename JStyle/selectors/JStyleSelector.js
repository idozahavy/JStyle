import { getRandomStr } from "../funcs/StrFuncs.js";

class JStyleSelector {
  constructor(selectorName, properties = {}) {
    this.selectorName = selectorName;
    this.properties = properties;
  }
}

export default JStyleSelector;
