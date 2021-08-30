//Comienzo declarando constantes con elementos del DOM que me interesa manipular
const nuevaTareaInput = document.getElementById("nuevaTareaInput");
const agregarBtn = document.getElementById("agregarBtn");
const lista = document.getElementById("lista");

//Comportamiento del botón agregar
agregarBtn.addEventListener("click", function(e) {
    e.preventDefault(); // evita el reload de la página
    const textoDeLaTarea = nuevaTareaInput.value; //obtiene el valor del input
    agregarTarea(textoDeLaTarea);
});

//Función para agregar una tarea
function agregarTarea(texto) {
    const nuevoLi = document.createElement("li"); //crea un elemento li
    nuevoLi.innerHTML = 
        `
        <input type="checkbox">
        <p>${texto}</p>
        <button onclick="eliminarTarea(this)">Eliminar</button>
        `;

    lista.prepend(nuevoLi); //agrega el elemento al principio de la lista
}

//Función para eliminar una tarea
function eliminarTarea(e) {
    e.parentElement.remove(); //elimina el elemento padre del elemento que se le pasa como parámetro
}