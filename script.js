const nameTask = document.getElementById("taskName");
const nameDesc = document.getElementById("taskDesc");
const nameDate = document.getElementById("taskDate");
const botonAgregar = document.getElementById("boton");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("search");
const btnMostrarCompletadas = document.getElementById("btnCompletadas");
const btnOrdenarPorFecha = document.getElementById("btnOrdenarPorFecha");

let tareas = [];
let mostrandoSoloCompletadas = false;
let isSorted = false;

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

function formatearFecha(fecha) {
    if (!fecha) return "";
    const opciones = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
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
        li.className = tarea.completada ? "task-complete" : "";

        li.innerHTML = `
            <div class="task-header">
                <span>
                    <i class="fa-regular ${tarea.completada ? "fa-circle-check" : "fa-circle"} task-icon"></i> 
                    ${tarea.nombre}
                </span>
                <small>${formatearFecha(tarea.fecha)}</small>
            </div>
            ${tarea.descripcion ? `<p>${tarea.descripcion}</p>` : ""}
        `;

        // Click para marcar/desmarcar como completada
        li.addEventListener("click", function () {
            tarea.completada = !tarea.completada;
            guardarEnLocalStorage();
            mostrarLista();
        });

        // Doble click para eliminar
        li.addEventListener("dblclick", function () {
            tareas = tareas.filter(t => t !== tarea);
            guardarEnLocalStorage();
            mostrarLista();
        });

        taskList.appendChild(li);
    });
}

// Buscador
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

document.addEventListener("DOMContentLoaded", function() {
    btnMostrarCompletadas.classList.add("modo-todas");
    btnMostrarCompletadas.innerHTML = `<i class="fa-solid fa-check"></i> Mostrar completadas`;
});

btnMostrarCompletadas.addEventListener("click", function () {
    mostrandoSoloCompletadas = !mostrandoSoloCompletadas;
    
    if (mostrandoSoloCompletadas) {
        const filtradas = tareas.filter(t => t.completada === true);
        mostrarLista(filtradas);
        btnMostrarCompletadas.innerHTML = `<i class="fa-solid fa-list"></i> Mostrar todas`;
        btnMostrarCompletadas.classList.remove("modo-todas");
    } else {
        mostrarLista(tareas);
        btnMostrarCompletadas.innerHTML = `<i class="fa-solid fa-check"></i> Mostrar completadas`;
        btnMostrarCompletadas.classList.add("modo-todas");
    }
});

// Ordenar por fecha límite
function ordenarPorFecha() {
    tareas.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
    mostrarLista(tareas);
}

btnOrdenarPorFecha.addEventListener("click", function () {
    if (!isSorted) {
        ordenarPorFecha();
        isSorted = true;
    } else {
        tareas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        mostrarLista(tareas);
        isSorted = false;
    }
});