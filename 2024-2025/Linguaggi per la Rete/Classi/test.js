/*function Range(from,to){
    let r = Object.create(Range.methods);
    r.from = from;
    r.to = to;

    r.includes = function(x){
        return this.from <= x && x < this.to;
    };
    return r;
}

// per metterlo in un protoype
Range.methods = {
    includes(x){return this.from <= x && x < this.to;},
    toString() {return "(" +  this.from + "..." + this.to + ")";}
}



// Maniera standard con l'uso della keyword new
function Range(from,to){
    // let r = Object.create(Range.prototype);
    if(! new.target) // property per indicare se la funzione è stata invocata come costruttore
        return new Range(from,to);
    
    this.from = from;
    this.to = to;

    // return r;
}

Range.prototype = {
    includes(x){return this.from <= x && x < this.to;},
    toString() {return "(" +  this.from + "..." + this.to + ")";}
}


function Other(){}
Other.prototype = Range.prototype;*/

class Range{
    constructor(from,to){
        if(typeof from == "number" && typeof to == "number"){
            this.from = from;
            this.to = to;
        } else if(typeof from == "string"){
            let parsedRange = Range.parse(from);
            this.from = parsedRange.from;
            this.to = parsedRange.to;
        } else 
            throw new TypeError("no good parameters");
    }
    includes(x){return this.from <= x && x < this.to;}
    toString() {return "(" +  this.from + "..." + this.to + ")";}
    static parse(s){
        let matches = s.match(/^\((\d+)\.\.\.(\d+)\)$/);
        if(!matches)
            throw new TypeError("Cannot parse " + s);
        return new Range(parseInt(matches[1],matches[2])); // prende i gruppi e le inserisce nel nuovo oggetto
    }
}

let r1 = new Range(1,10);
let r2 = new Range(100,120);
let t1 = r1.includes(5);
let t2 = r2.includes(5);
console.log("" + r1);
console.log("" + r2);

let test = r1 instanceof Range;
let r3 = Range.parse("(1...10");
let r4 = new Range("(1...10)");
