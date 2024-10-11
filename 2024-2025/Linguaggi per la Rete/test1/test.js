let a = 1;
let b = 10;
let x = b ?? a;
let y = 1; 
y = a = 3, b = 7; //in questo caso y = 3 per questioni di priorità e devo mettere le parentesi per fare y = 7
let c = a;
var d;
let t = -1;
if(t){
    c =  "pippo";
}
a = a + true;
d = 10;
console.log(typeof a);
