/*let square = {
    side : 10,
    area : function(sidevalue){
        let result = sidevalue;
        result = result * result;
        return result;
    }
   area(){return this.side * this.side;}
}

// TODO: scrivere come cambia this nei due casi
let areaEvaluationFunction = square.area;
let myArea = areaEvaluationFunction(square.side);

myArea = square.area(square.side);*/


let p = {
    x : 1.0,
    y : 1.0,

    get r(){return Math.hypot(this.x,this.y);},
    set r(v){
        let ratio = v / Math.hypot(this.x,this.y); // oppure let ratio = v / this.r; // invoca nel secondo caso il getter 
        this.x *= ratio;
        this.y *= ratio;
    },

    get theta(){return Math.atan2(this.y,this.x);}
};

p.x = 4;
p.y = 3;
p.r = 10; // capisce che questo è un setter
let pr = p.r; // capisce che questo è un getter
let angle = p.theta;

let p1 = Object.create(p); // utlizza il meccanismo di prototype
let p2 = Object.create(p); // utilizza il meccanismo di prototype

let r1 = p1.r;
p2.r = 20;
let r2 = p2.r;
