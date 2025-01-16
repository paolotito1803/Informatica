/*for(var level = 6; level > 0; level--){
    var current = document.getElementsByTagName("h"+level);
    for(var i=0; i<current.length; i++){
        var nuovoHeader = document.createElement("h" + (level+1>6?6:level+1));
        nuovoHeader.innerHTML = current[i].innerHTML.toUpperCase();
        //current[i].parentNode.replaceChild(nuovoHeader, current[i]);
        document.body.insertBefore(nuovoHeader, current[i]);
        document.body.removeChild(current[i]);
    }
}
*/
for(let level = 6; level > 0; level--){
    let current_level = document.getElementsByTagName("h" + level);
    for(let i = 0; i < current_level.length; i++){
        let nuovo_level = document.createElement("h" + (level + 1 > 6 ? 6 : level + 1));
        nuovo_level.innerHTML = current_level[i].textContent.toUpperCase();
        document.body.removeChild(current_level[i]);
        document.body.appendChild(nuovo_level);
    }
}
