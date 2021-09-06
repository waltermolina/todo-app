nuevaTareaInput = document.getElementById("nuevaTareaInput");
agregarBtn = document.getElementById("agregarBtn");
lista = document.getElementById("lista");
fullscreenBtn = document.getElementById("fullscreenBtn");
let tareas = [];

let geo = { lat: null, lon: null };

//Comportamiento del botón fullscreen
fullscreenBtn.addEventListener("click", function (e) {
    if (document.fullscreenElement == null) {
        document.documentElement.requestFullscreen();
        fullscreenBtn.innerHTML = "💨";
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = "📺";
    }
});

//Comportamiento del botón agregar
agregarBtn.addEventListener("click", function (e) {
    e.preventDefault(); // evita el reload de la página
    const textoDeLaTarea = nuevaTareaInput.value;
    agregarTarea(textoDeLaTarea);
});

function agregarTarea(texto) {
    //crear elemento li
    const nuevoLi = document.createElement("li");
    nuevoLi.setAttribute("data-id","sssssss")
    nuevoLi.innerHTML =
        `
    <input type="checkbox">
    <p>${texto}</p>
    <button onclick="copiarTarea(this)">Copiar</button>
    <button onclick="compartirTarea(this)">Compartir</button>
    <button onclick="eliminarTarea(this)">Eliminar</button>
    `;

    // puedo pedir ubicacion para cada tarea? como?

    lista.prepend(nuevoLi);
    tareas.push({
        texto: texto,
        "completado": false,
        "ubicacion": { "lat": geo.lat, "lon": geo.lon }
    })

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function eliminarTarea(e) {
    e.parentElement.remove();
}

function copiarTarea(e) {
    //e.parentElement.remove();
    console.log("Copiar!");

    if (navigator.clipboard != undefined) {

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

function recuperarUbicacion() {

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (location) {
                geo.lat = location.coords.latitude;
                geo.lon = location.coords.longitude;
            },
            function (err) {
                console.warn(err);
                geo.lat = null;
                geo.lon = null;
            }
        );
    } else {
        return null;
    }

}

window.onload = function () {
    recuperarUbicacion();
    console.log(geo);

    tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    for (let i = 0; i < tareas.length; i++) {
        //agregarTarea(tareas[i].texto);
        //crear elemento li
        const nuevoLi = document.createElement("li");
        nuevoLi.innerHTML =
            `
            <input type="checkbox">
            <p>${tareas[i].texto}</p>
            <button onclick="copiarTarea(this)">Copiar</button>
            <button onclick="compartirTarea(this)">Compartir</button>
            <button onclick="eliminarTarea(this)">Eliminar</button>
            `;
        
        lista.prepend(nuevoLi);
    }
}