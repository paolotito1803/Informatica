/*function createRow(nameText, ingredientsText, priceText, total){
    let riga = document.createElement("td");
    riga.innerHTML = nameText;
    riga.addEventListener("mouseover", function(){riga.innerHTML = ingredientsText;}); //se passo sopra mi mostra gli inggredienti
    riga.addEventListener("mouseout", function(){riga.innerHTML = nameText;});
    let prezzo =  document.createElement("td");
    prezzo.innerHTML = priceText;
    prezzo.addEventListener("click", function(){total.innerHTML = parseFloat(total.innerHTML) + parseFloat(priceText)});

    let tr = document.createElement("tr");
    tr.appendChild(riga);
    tr.appendChild(prezzo);

    return tr;
}

let menus = document.getElementsByClassName("menu"); //crea un array con gli elementi dei menu

while(menus.length > 0){ //ad ogni iterazione diminuisce la lunghezza
    let menu = menus[0];
    let table = document.createElement("table"); //tabella al posto del menu
    let total = document.createElement("div"); //elemento per il totale dei prezzi
    total.innerHTML = "0";
    menu.parentNode.insertBefore(table, menu); //metto la tabella prima del primo div casse perchè parent node è il body
    menu.parentNode.insertBefore(total, menu); //analogo solo che dopo la tabella
    menu.parentNode.removeChild(menu); //rimuove il primo menu alternativa menus[0].remove()

    let divis = menu.getElementsByTagName("div");
    while(divis.length > 0){
        let blocks = divis[0].textContent.split(";");
        table.appendChild(createRow(blocks[0], blocks[1], blocks[2], total));
         menu.removeChild(divis[0]); //elimino il primo div dentro la classe che ha come padre menu
    }
}*/

/*
function createRow(nome, ingrediente, prezzo, totale){
  let riga = document.createElement("td");
  riga.innerHTML = nome;
  riga.addEventListener("mouseover", function(){riga.innerHTML = ingrediente;});
  riga.addEventListener("mouseout", function(){riga.innerHTML = nome});
  let price = document.createElement("td");
  price.innerHTML = prezzo;
  price.addEventListener("click", function(){totale.innerHTML = parseFloat(totale.innerHTML) + parseFloat(prezzo);});
  let tr = document.createElement("tr");
    tr.appendChild(riga);
    tr.appendChild(price);

  return tr;
}

let menu = document.getElementsByClassName("menu");
while(menu.length > 0){
  let table = document.createElement("table");
  let tot = document.createElement("div");
  let elem_menu = menu[0];
  tot.innerHTML = "0";
  elem_menu.parentNode.insertBefore(table, elem_menu);
  elem_menu.parentNode.insertBefore(tot, elem_menu);
  elem_menu.parentNode.removeChild(elem_menu);

  //ho portato su tutto <div>Gustosa;pomodoro, mozzarella, salame piccante, ricotta;7.00</div>, ora devo gestire gli ingredienti e il prezzo
  let ingredienti = elem_menu.getElementsByTagName("div"); //prendo ongi cosa all'interno dei singli div degli ingredienti
  while(ingredienti.length > 0){ //scorro il contenuto dei div per separare ingredienti e costo e inserirli nel posto corretto
    let pizze = ingredienti[0].textContent.split(";");
    table.appendChild(createRow(pizze[0], pizze[1], pizze[2], tot));
    elem_menu.removeChild(ingredienti[0]);
  }
}*/

/*
function createRow(nome, ingrediente, costo, totale){
  let colonna = document.createElement("td");
  colonna.innerHTML = nome;
  colonna.addEventListener("mouseover", function(){colonna.innerHTML = ingrediente;});
  colonna.addEventListener("mouseleave", function(){colonna.innerHTML = nome;});
  let price = document.createElement("td");
  price.innerHTML = costo;
  price.addEventListener("click", function(){totale.innerHTML = parseFloat(totale.innerHTML) + parseFloat(costo);});

  let riga = document.createElement("tr");
  riga.appendChild(colonna);
  riga.appendChild(price);
  return riga;
}

let menu = document.getElementsByClassName("menu");
while(menu.length > 0){
  let tabella = document.createElement("table");
  let tot = document.createElement("div");
  //let elem = menu[0];
  console.log(menu[0]);
  tot.innerHTML = 0;
  document.body.insertBefore(tabella, menu[0]);
  document.body.insertBefore(tot, menu[0]);
  

  let inggredienti = menu[0].getElementsByTagName("div");
  console.log(inggredienti);
  while(inggredienti.length > 0){
    let pizze = inggredienti[0].textContent.split(";");
    console.log(pizze);
    tabella.appendChild(createRow(pizze[0], pizze[1], pizze[2], tot));
    menu[0].removeChild(inggredienti[0]);
  }
  document.body.removeChild(menu[0]);
}*/

function creaTabella(nome, ingrediente, costo, totale){
  let riga = document.createElement("tr");
  let colonna_pizza = document.createElement("td");
  let colonna_prezzo = document.createElement("td");
  colonna_pizza.innerHTML = nome;
  colonna_prezzo.innerHTML = costo;
  colonna_pizza.addEventListener("mouseover", function(){colonna_pizza.innerHTML = ingrediente;});
  colonna_pizza.addEventListener("mouseleave", function(){colonna_pizza.innerHTML = nome;});
  colonna_prezzo.addEventListener("click", function(){totale.innerHTML = parseFloat(costo) + parseFloat(totale.innerHTML);});
  riga.appendChild(colonna_pizza);
  riga.appendChild(colonna_prezzo);
  return riga;
}

let menu = document.getElementsByClassName("menu");
while(menu.length > 0){
  let tabella = document.createElement("table");
  let totale = document.createElement("div");
  totale.innerHTML = 0;
  document.body.appendChild(tabella);
  document.body.appendChild(totale);
  let pizze = menu[0].getElementsByTagName("div");
  while(pizze.length > 0){
    let ingredienti = pizze[0].textContent.split(";");
    tabella.appendChild(creaTabella(ingredienti[0], ingredienti[1], ingredienti[2], totale));
    menu[0].removeChild(pizze[0]);
  }
  document.body.removeChild(menu[0]);
}