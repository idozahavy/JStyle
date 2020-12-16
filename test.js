import JStyleClass from "./JStyle/class/JStyleClass.js";
import { ElementAttrs, filterElements } from "./JStyle/elements/ElementArray.js";
import JStyle from "./JStyle/JStyle.js";
import QueryOptions from "./JStyle/query/QueryOptions.js";

// jstyle = JStyle.fromCSS("./text.css")

// var newClass = JStyle.newClass();
// var newClass = JStyle.newClass("abc"); // className = abc
// var newClass = JStyle.newClass("abc",true); // unique className
// var newClass = JStyle.getClass(".existingClass"); // overwrite className properties

var js = new JStyle("id", {container: document.head}); // 1000 times - 82ms - bad
var d = new JStyleClass("ggg", false); // million times - 80ms - ok
js.addJStyleClass(d); // million times - 5ms - ok

let elements = QueryOptions.getElements({});
let attrs;
console.log(elements[50]);
let timestamp = new Date().getTime();
for (let i = 0; i < 1000; i++) {
  // attrs = new ElementAttrs({tag: "div", id: "abc"});
  // elements = filterElements(elements, {localName:"div", id: "abc"});
  // elements = QueryOptions.getElements({});
  // for (let i = 0, n = elements.length; i < n; i++) {
  //   if (!elements[i].classList.contains("ggg")) {
  //     elements[i].classList.add("ggg");
  //   }
  // }

  d.queryBind({tag: "div", id: "abc"});
}
console.log("loop1", new Date().getTime() - timestamp);

d.queryBind({tag: "div", id: "ggg"}); // 1000 times - 26ms - not good

// timestamp = new Date().getTime();
d.setAttr("color", "red");
d.setAttr("background-color", "blue");
d.setHeight("100px");
d.setBackgroundColor("gray");
js.updateStylesheet();
// console.log("style change", new Date().getTime() - timestamp);

// selector = new JStyleSelector(JStyleSelector.getUnique("abc"));

var g = new JStyleClass("ggg", false, document.head);
js.addJStyleClass(g);
g.setColor("red");
g.setBackgroundColor("blue");
js.updateStylesheet();
