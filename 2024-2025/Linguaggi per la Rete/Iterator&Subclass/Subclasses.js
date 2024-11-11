class EZArray extends Array{
	get first(){
		return this[0];
	}
	get last(){
		return this[this.length-1];
	}
}

let a1 = new EZArray();
let a2 = new EZArray();
a1.push(2);
a1.push(4);
a1.push("pippo");
a2.push(true);
/*
console.log(a1);
console.log(a1.first);
console.log(a2.last);
console.log();

console.log(a1 instanceof EZArray);
console.log(a1 instanceof Array);
*/
class TypedMap extends Map{
	
	keyType = 'string';
	valueType = 'number';
	
	constructor(keyType,valueType,entries){
		
		super(entries);	
		
		if(keyType)
			this.keyType = keyType;
		if(valueType)
			this.valueType = valueType;

		if(entries)
			for(let [k,v] of entries)
				this.checkTypes(k,v);
	}

	set(k,v){
		this.checkTypes(k,v);
		return super.set(k,v);
	}
	
	checkTypes(k,v){
		console.log(this instanceof TypedMap);
		if((this.keyType && typeof k !== this.keyType )|| 
		   (this.valueType && typeof v !== this.valueType))
		   throw "keyType must be "+this.keyType+
				 " and valueType must be "+this.valueType;
	}
}

let tm = new TypedMap('string','boolean',[['a',true],['b',false]]);
console.log(tm.valueType);
//let defaultMap = new TypedMap('string','number');
//defaultMap.set('test',1);

