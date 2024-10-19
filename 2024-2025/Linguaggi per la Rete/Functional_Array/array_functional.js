/*[x,y] = [y,x]; // scambia le variabili dell'array.
let letters = [..."Hello World"]; // array che contiene 11 elementi uno per ciascuna lettera
let reverse = "";
// for classico con gli indici
for(let letter = 0; letter<letters.length; letter++)
    reverse = letters[letter] + reverse;

// for..of Lavora sui valori degli iterable
for(let letter of letters){
    reverse = letter + reverse;
}

// for..in lavora sulle chiavi dell'oggetto. In questo caso ritorna gli indici di ogni elemento
for(let letter in letters){
    reverse = letter + reverse; 
}

let everyother = "";
// entries() produce un iterable di coppie chiave-valore e mostra solo l'iteratore
for(let [index,letter] of letters.entries())
    if(index % 2 == 0) everyother += letter;

let o = {x:1, y:2};
for(let field of Object.keys(o)) // keys() metodo statico che torna un array contenti le chiavi di un oggetto
    field = field + 1;

*/

// PROGRAMMAZIONE CON METODI FUNZIONALI
let data = [1,2,3,4,5];
let sum = 0;
data.forEach(function(value){
    sum += value;
}); // prende una funzione e la esegue su tutti gli elementi dell'array(in generale dell'iterable)

// può essere convertita in:
data.forEach((value) => {sum += value;}); // utilizzo della lambda

let workingFunction = (v,i,a) => {console.log("ciao " + i + " " + v + " " + a); return a [i] = v*v};
data.forEach(workingFunction);

let datasquared = data.map(x => x*x); // crea un nuovo array con i risultati della funzione passata come parametro

// possibile implementazione di map
function mapArray(array, worker){
    let result = [];
    for(let i = 0; i < array.length; i++)
        result.push(worker(array[i],i,array));
    return result;
}

let b = data.filter(x => x < 3); // se true inserisce l'elemento in b altrimenti va al successivo
let i = data.findIndex(x => x < 3); // trova l'indice del primo elemento che rispetta la condizione
let e = data.find(x => x > 3); // trova il primo elemento che rispetta la condizione
let allpositive = data.every(x => x > 0); // restituisce true se tutti gli elementi rispettano la condizione
let somma = data.reduce((current,v,i,a) => current+v, 0); // usata per operazioni di aggregazione