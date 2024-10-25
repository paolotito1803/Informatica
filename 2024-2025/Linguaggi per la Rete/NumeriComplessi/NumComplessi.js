class Complex{
    static ZERO = new Complex(0,0);

    #r = 0; // campo privato
    #i = 0; // campo privato
    constructor(real = 0, imaginary = 0){
        this.#r = real;
        this.#i = imaginary;
    }

    plus(other){
        return new Complex(this.#r + other.#r, this.#i,other.#i);
    }

    static sum(a,b){return a.plus(b);}

    get i(){return this.#i;}
    get r(){return this.#r;}

    toString(){return this.r + " i"+ this.i;}
}


let c1 = new Complex(1,1);
let c2 = new Complex(2,3);
let c3 = c1.plus(c2);
let i_part = c3.i; // ottengo la parte immaginaria di c3
let c5 = Complex.sum(c1,c2);
console.log(c3);