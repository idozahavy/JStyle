import JStyleClass from "./JStyle/class/JStyleClass.js";
import {ElementAttrs, filterElements} from "./JStyle/elements/ElementArray.js";
import JStyle from "./JStyle/JStyle.js";
import QueryOptions from "./JStyle/query/QueryOptions.js";

// jstyle = JStyle.fromCSS("./text.css")

// var newClass = JStyle.newClass();
// var newClass = JStyle.newClass("abc"); // className = abc
// var newClass = JStyle.newClass("abc",true); // unique className
// var newClass = JStyle.getClass(".existingClass"); // overwrite className properties

var js = new JStyle("JStyleId", {container: document.head, position: "afterbegin"}); // 1000 times - 82ms - bad
var d = js.newClass("blopaaa", false);

d.setAttr("color", "red");
d.setAttr("background-color", "blue");
d.setHeight("100px");
d.setBackgroundColor("gray");

d.queryBind({tag: "div", id: "abc"}); // 1000 times - 26ms - not good

let elements = QueryOptions.getElements({});
let attrs;

console.log(elements[50]);
let timestamp = new Date().getTime();
for (let i = 0; i < 1_000; i++) {
  // attrs = new ElementAttrs({tag: "div", id: "abc"});
  // elements = filterElements(elements, {localName:"div", id: "abc"});
  // elements = QueryOptions.getElements({});
  // for (let i = 0, n = elements.length; i < n; i++) {
  //   if (!elements[i].classList.contains("ggg")) {
  //     elements[i].classList.add("ggg");
  //   }
  // }

  d.queryBind({tag: "div", id: "abc"});
  // js.updatePage();
}
console.log("loop1", new Date().getTime() - timestamp);

js.updatePage();

var g = js.newClass("ggg", false);
g.setColor("red");
g.setBackgroundColor("blue");
g.ddd = true;
js.updatePage();
setInterval(()=>js.toggle(),1000*10);
