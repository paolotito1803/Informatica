function updateClock(){
    let now = new Date();
    document.getElementById("ore").setAttribute('transform', 'rotate(' + now.getHours()*30.0+')');
    document.getElementById("minuti").setAttribute('transform', 'rotate(' + now.getMinutes()*6.0+')');
    document.getElementById("secondi").setAttribute('transform', 'rotate(' + now.getSeconds()*6.0+')');
}

function createTicks(){
    let clock = document.getElementById("clock");
    for(let minute = 0; minute < 60; minute+=5){
        let tick = document.createElementNS("http://www.w3.org/2000/svg","line");
        tick.setAttribute("stroke","black");
        tick.setAttribute("stroke-width","2");
        tick.setAttribute("x1",0);
        tick.setAttribute("y1",-90);
        tick.setAttribute("x2",0);
        tick.setAttribute("y2",-100);
        tick.setAttribute("transform", 'rotate('+(minute*6.0)+')');
        clock.appendChild(tick);
    }
}

createTicks();
setInterval(updateClock,1000);