nuevaTareaInput = document.getElementById("nuevaTareaInput");
agregarBtn = document.getElementById("agregarBtn");
lista = document.getElementById("lista");
fullscreenBtn = document.getElementById("fullscreenBtn");

//Comportamiento del botón fullscreen
fullscreenBtn.addEventListener("click", function(e) {
    if(document.fullscreenElement == null) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerHTML = "💨";
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = "📺";
    }
});

//Comportamiento del botón agregar
agregarBtn.addEventListener("click", function(e) {
    e.preventDefault(); // evita el reload de la página
    const textoDeLaTarea = nuevaTareaInput.value;
    agregarTarea(textoDeLaTarea);
});

function agregarTarea(texto) {
    //crear elemento li
    const nuevoLi = document.createElement("li");
    nuevoLi.innerHTML = 
    `
    <input type="checkbox">
    <p>${texto}</p>
    <button onclick="copiarTarea(this)">Copiar</button>
    <button onclick="compartirTarea(this)">Compartir</button>
    <button onclick="eliminarTarea(this)">Eliminar</button>
    `;

    lista.prepend(nuevoLi);
}

function eliminarTarea(e) {
    e.parentElement.remove();
}

function copiarTarea(e) {
    //e.parentElement.remove();
    console.log("Copiar!");

    if(navigator.clipboard != undefined) {

        navigator.clipboard.writeText(e.parentElement.children[1].innerText)
        .then(
            () => console.log("Copiado!")
        )
        .catch(err => console.error("Ups!", err));
    }    
}

function compartirTarea(e) {
    if (!("share" in navigator)) { //si no esta API share en el navegador tiro un mensaje
        console.log("😭");	
        return;
    }

    text = e.parentElement.children[1].innerText;

    navigator.share(
        // JSON se basa en la sintaxis que tiene Javascript para crear objetos
        {
            title: 'Te comparto una tarea de mi lista',
            text: text,
            url: document.URL
        }
    ).then(
        () => console.log('Compartido!')
    )
    .catch(
        error => console.error('Error:', error)
    );
}