import abcStyle from "./abc.css";
import JStyle from "./JStyle/JStyle";

var styleElement = new JStyle("newId");
var clazz = styleElement.newClass("uniqueClassName",true);
clazz.style = {
 color: "red"
}
styleElement.updatePage();


<div className={clazz.className}>

</div>

