////Administrador de Tareas con Guardado en el Navegador
//
//Los datos deben persistir con localStorage (si recargas la página, no se pierden).
//
//Opcional para subir de nivel:
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
    mostrarLista(tareas);

    nameTask.value = "";
    nameDesc.value = "";
    nameDate.value = "";
});

function mostrarLista(lista) {
    taskList.innerHTML = "";
    lista.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = `${tarea.nombre} - ${tarea.descripcion} - ${tarea.fecha}`;
        li.className = tarea.completada ? "completada" : "";
        taskList.appendChild(li);

        li.addEventListener("click", function () {
            tarea.completada = !tarea.completada;
            li.classList.toggle("completada");
        });

        li.addEventListener("dblclick", function () {
            tareas = tareas.filter(t => t !== tarea);
            mostrarLista(tareas);
        });
    });
}

searchInput.addEventListener("input", function () {
    const texto = searchInput.value.trim().toLowerCase();

    if (texto === "") {
        mostrarLista(tareas);
        return;
    }

    const filtrado = tareas.filter(est =>
        est.nombre.toLowerCase().startsWith(texto)
    );

    mostrarLista(filtrado);
});