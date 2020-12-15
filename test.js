import JStyle from "./JStyle/JStyle.js";
import JStyleSelector from "./JStyle/selectors/JStyleSelector.js";

// jstyle = JStyle.fromCSS("./text.css")

// var newClass = JStyle.newClass();
// var newClass = JStyle.newClass("abc"); // className = abc
// var newClass = JStyle.newClass("abc",true); // unique className
// var newClass = JStyle.getClass(".existingClass"); // overwrite className properties

var d = new JStyle("abc", 1);
let timestamp = new Date().getTime();
for (let i = 0; i < 100_000; i++) {
  d.queryBind({tag: "div", id: "abc"}); // 0.042 milliseconds for 50 dives
}
console.log("binding", new Date().getTime() - timestamp);
timestamp = new Date().getTime();
d.setAttr("color", "red");
d.setAttr("background-color", "blue");
d.setHeight("100px");
d.setBackgroundColor("gray");
console.log("style change", new Date().getTime() - timestamp);

// selector = new JStyleSelector(JStyleSelector.getUnique("abc"));

var g = new JStyle("ggg", false, document.head);
g.setColor("red");
g.setBackgroundColor("blue");
