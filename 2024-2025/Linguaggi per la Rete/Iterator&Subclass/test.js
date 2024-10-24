class Range{
    constructor(from = 0,to = 0){
        if(typeof from == "number" && typeof to == "number"){
            this.from = from;
            this.to = to;
        } else if(typeof from == "string"){
            let parsedRange = Range.parse(from);
            this.from = parsedRange.from;
            this.to = parsedRange.to;
        } else {}
            //throw new TypeError("no good parameters");
    }

    *[Symbol.iterator](){ // il suo scope rimane sempre attivo e la funzione non si chiude mai
        for(let x = Math.ceil(this.from); x < this.to; x++)
            yield x; // corrisponde ad un next() in Java. Rimane in memoria solo x.
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

class Span extends Range{
    constructor(start, length){
        if(length < 0)
            throw new Error("negative length");
        super(start,start+length);
    }
}

let r1 = new Range(1,10);
let r2 = new Range(100,120);
let t1 = r1.includes(5);
let t2 = r2.includes(5);
console.log("" + r1);
console.log("" + r2);

let test = r1 instanceof Range;
let r3 = Range.parse("(1...10)");
let r4 = new Range("(20...34)");

// iteratori
let concreteRange = [...r4];

for(let v of r4) // chiama ogni volta l'iteratore e ne restituisce l'elemento -> FUNCTION CALL CON SCOPE GIA' ESISTENTE
    console.log("element is: "+v);
