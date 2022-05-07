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
    nuevoLi.setAttribute("data-id", "sssssss")
    nuevoLi.innerHTML =
        `
    <input type="checkbox">
    <p>${texto}</p>
    <button class="button" onclick="copiarTarea(this)">C</button>
    <button class="button" onclick="compartirTarea(this)">S</button>
    <button class="button" onclick="eliminarTarea(this)">D</button>
    `;

    // puedo pedir ubicacion para cada tarea? como?
    recuperarUbicacion();
    setTimeout(function () {

        lista.prepend(nuevoLi);
        tareas.push({
            texto: texto,
            "completado": false,
            "ubicacion": { "lat": geo.lat, "lon": geo.lon }
        })

    }, 5000);

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

const obtenerUbicacion = async () => {
    // A new Promise() se le pasa por parámetro una función con dos callbacks,
    // el primero resolve el que utilizaremos cuando se cumpla la promesa, 
    // y el segundo reject cuando se rechace

    const promesa = new Promise((resolve, reject) => {
        //llamo a getCurrentPosition y le paso los parámetros
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    console.log(new Date().toLocaleTimeString(), "promesa", promesa);

    const posicion = await promesa; //en este punto se detiene la ejecución del código y espera a que se cumpla la promesa

    console.log(new Date().toLocaleTimeString(), "posicion", posicion);

    return {
        lon: posicion.coords.longitude,
        lat: posicion.coords.latitude,
    };
};

async function obtenerUbicacion2() {
    // A new Promise() se le pasa por parámetro una función con dos callbacks,
    // el primero resolve el que utilizaremos cuando se cumpla la promesa, 
    // y el segundo reject cuando se rechace

    const promesa = new Promise((resolve, reject) => {
        //llamo a getCurrentPosition y le paso los parámetros
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    console.log(new Date().toLocaleTimeString(), "promesa", promesa);

    const posicion = await promesa; //en este punto se detiene la ejecución del código y espera a que se cumpla la promesa

    console.log(new Date().toLocaleTimeString(), "posicion", posicion);

    return {
        lon: posicion.coords.longitude,
        lat: posicion.coords.latitude,
    };
};

let getLocationPromise = () => {
    return new Promise(function (resolve, reject) {
        // Promisifying the geolocation API
        navigator.geolocation.getCurrentPosition(
            (position) => resolve(position),
            (error) => reject(error)
        );
    });
};

window.onload = async function () {
    //recuperarUbicacion();
    //setTimeout(function(){
    //    console.log("1, ", geo);
    //},5000)


    geo = await obtenerUbicacion();

    console.log(new Date().toLocaleTimeString(), "coords", geo);

    //fetch a api

    const options = {
        method: "GET"
    };

    const tarea = {
        "atributo": "valor" ,
        "atributo2": 2
        };


    fetch("https://dhfakestore.herokuapp.com/api/products", {method: "GET"})
    .then(response => response.json())
    .then(datos => {
        console.log("MIS DATOS: ", datos);
        for (let i = 0; i < datos.length; i++) {
            const nuevoLi = document.createElement("li");
            nuevoLi.innerHTML =
            `
            <input type="checkbox">
            <p>${datos[i].title}</p>
            <button class="button" onclick="copiarTarea(this)">C</button>
            <button class="button" onclick="compartirTarea(this)">S</button>
            <button class="button" onclick="eliminarTarea(this)">D</button>
            `;

            lista.prepend(nuevoLi);

        }
        
    }).catch(error => console.log("Todo bien!"));


    //tareas = JSON.parse(localStorage.getItem("tareas")) || [];
    /*
    for (let i = 0; i < tareas.length; i++) {
        //agregarTarea(tareas[i].texto);
        //crear elemento li
        const nuevoLi = document.createElement("li");
        nuevoLi.innerHTML =
            `
            <input type="checkbox">
            <p>${tareas[i].texto}</p>
            <button class="button" onclick="copiarTarea(this)">C</button>
            <button class="button" onclick="compartirTarea(this)">S</button>
            <button class="button" onclick="eliminarTarea(this)">D</button>
            `;

        lista.prepend(nuevoLi);
    }*/
}