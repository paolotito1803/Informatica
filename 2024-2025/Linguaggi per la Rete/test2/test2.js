let o1 = {x : 3, y : -2, tst : true};
let toStringFunction = o1.toString;
let stringValue = o1.toString();
let k = toStringFunction();
let o2 = {a : "test a", b : "test b"};
o2 = o1;
let o3 = Object.create(o1);
o3.y = "My y"
let v1 = o3.y;
let v2 = o3.x;
let v3 = o3.z;

let f1 = function(a, b){
    let max = a;
    if(b > max)
        max = b;
    return max;
};