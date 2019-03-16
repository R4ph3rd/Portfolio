document.onLoad = twPopConstructeur();

function twPopConstructeur(){
    var anchors = document.getElementsByTagName("a");
    for (var i=0; i<anchors.length; i++){
        var anchor = anchors[i];
        var relAttribute = String(anchor.getAttribute("class"));
        if (anchor.getAttribute("href") && (relAttribute.toLowerCase().match("twpop"))){
            var oParent = anchor.parentNode;
            var oImage=document.createElement("img");
            oImage.src = anchor.getAttribute("href");
            oImage.alt = anchor.getAttribute("title")
             
            var oLien=document.createElement("a");
            oLien.href = "#ferme";
            oLien.title = anchor.getAttribute("title");
            oLien.onclick = "return false;";
            oLien.appendChild(oImage);
             
            var sNumero = "id"+i;
             
            var node=document.createElement("div");
            node.id = sNumero;
            node.className = "twAudessus";
            if (relAttribute.toLowerCase().match("vertical")){
                oImage.classList.add("verti");
            } else oImage.classList.add("rise")
            node.appendChild(oLien);
            anchor.setAttribute("href","#"+sNumero);
      oParent.appendChild(node);
        }
    }
}