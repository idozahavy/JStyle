import JStyle2Static from "./JStyle2Statics.js";

// tries to enter the setters dynamically, its 4 times slower than explicitly
// setWidth = (value)=>{}; and afterwards setting the function by the name

class JStyle3SettersClass extends JStyle2Static {

}

export default JStyle3SettersClass;
