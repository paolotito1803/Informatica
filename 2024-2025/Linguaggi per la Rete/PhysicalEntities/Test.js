let v1 = new Vector();
let v2 = new Vector(10,6);
let v3 = new Vector(true);
let v4 = new Vector(v2);
v2.add(v4);
let sum = new Vector(v2).add(v4);
v2.mul(3);

let b1 = new Ball({position: new Vector(10,10), mass: 2.0, radius:3});
let b2 = new Ball({position: new Vector(20,20), color: "#ff0000"});