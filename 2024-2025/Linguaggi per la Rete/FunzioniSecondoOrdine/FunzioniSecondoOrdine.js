function createCounter(start){
    let c = start ?? 0;
    let f = function(){
        let next = c + 1;
        c = next;
        return next;
    };
    return f;
}
let c1 = createCounter(0);
let c2 = createCounter(3);
let c3 = c1;
let v1 = c1();
let v2 = c2();
v1 = c2();
v2 = c3();