window.onload = function(){
    let c = document.getElementById("surface").getContext("2d"); // prende l'elemento canvas e il contesto di disegno
                                                                // (contiene il necessario per disegnare)
    c.fillStyle = "#ff0000"; // è impostato per tutte le azioni di riempimento successive
    c.fillRect(50,50,100,100); // disegna il rettangolo passando le coordinate dei 4 punti
    c.fillStyle = "#00ff00";
    c.beginPath(); // comincia a prendere nota di azioni di disegno da eseguire
    c.moveTo(100,100); // alza la penna e spostati
    c.lineTo(200,200); // abbassa la penna fino a queste coordinate
    c.lineTo(100,200);
    c.lineTo(100,100);
    c.lineWidth = 3; // imposta lo spessore della linea
    c.stroke(); // disegna i bordi laterali
    c.fill();
}