////Administrador de Tareas con Guardado en el Navegador
//
//Filtrar por tareas completadas o pendientes.
//
//Ordenar por fecha límite.

const nameTask = document.getElementById("taskName");
const nameDesc = document.getElementById("taskDesc");
const nameDate = document.getElementById("taskDate");
const botonAgregar = document.getElementById("boton");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");

let tareas = [];

function guardarEnLocalStorage() {
    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function cargarDesdeLocalStorage() {
    const tareasGuardadas = localStorage.getItem("tareas");
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        mostrarLista(tareas);
    }
}

botonAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    const nombreTarea = nameTask.value.trim();
    const descTarea = nameDesc.value.trim();
    const fechaTarea = nameDate.value;

    if (nombreTarea === "") {
        alert("Por favor ingresa un nombre para la tarea.");
        return;
    }

    const nuevaTarea = {
        nombre: nombreTarea,
        descripcion: descTarea,
        fecha: fechaTarea,
        completada: false
    };

    tareas.push(nuevaTarea);
    guardarEnLocalStorage();
    mostrarLista(tareas);

    nameTask.value = "";
    nameDesc.value = "";
    nameDate.value = "";
});

function mostrarLista(lista = tareas) {
    taskList.innerHTML = "";
    lista.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = `${tarea.nombre} - ${tarea.descripcion} - ${tarea.fecha}`;
        li.className = tarea.completada ? "completada" : "";
        taskList.appendChild(li);

        li.addEventListener("click", function () {
            tarea.completada = !tarea.completada;
            guardarEnLocalStorage();
            mostrarLista();
        });

        li.addEventListener("dblclick", function () {
            tareas = tareas.filter(t => t !== tarea);
            guardarEnLocalStorage();
            mostrarLista();
        });
    });
}
searchInput.addEventListener("input", function () {
    const texto = searchInput.value.trim().toLowerCase();
    if (texto === "") {
        mostrarLista(tareas);
        return;
    }
    const filtrado = tareas.filter(est => est.nombre.toLowerCase().startsWith(texto));
    mostrarLista(filtrado);
});

window.addEventListener("load", cargarDesdeLocalStorage);

const btnMostrarCompletadas = document.getElementById("btnCompletadas");
let mostrandoSoloCompletadas = false;

document.addEventListener("DOMContentLoaded", function() {
    btnMostrarCompletadas.classList.add("modo-todas");
    btnMostrarCompletadas.textContent = "Mostrar completadas";
});

btnMostrarCompletadas.addEventListener("click", function () {
    mostrandoSoloCompletadas = !mostrandoSoloCompletadas;
    
    if (mostrandoSoloCompletadas) {
        const filtradas = tareas.filter(t => t.completada === true);
        mostrarLista(filtradas);
        btnMostrarCompletadas.textContent = "Mostrar todas";
        btnMostrarCompletadas.classList.remove("modo-todas");
    } else {
        mostrarLista(tareas);
        btnMostrarCompletadas.textContent = "Mostrar completadas";
        btnMostrarCompletadas.classList.add("modo-todas");
    }
});
