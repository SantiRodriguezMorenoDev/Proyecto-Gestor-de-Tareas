////Administrador de Tareas con Guardado en el Navegador
//
//Debe tener buscador en tiempo real para filtrar tareas.
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

let tareas = []; // Cambié el nombre para no confundir

botonAgregar.addEventListener("click", function (event) {

    const nombreTarea = nameTask.value.trim();
    const descTarea = nameDesc.value.trim();
    const fechaTarea = nameDate.value;
    event.preventDefault();

    const nuevaTarea = {
        nombre: nombreTarea,
        descripcion: descTarea,
        fecha: fechaTarea,
        completada: false
    };

    tareas.push(nuevaTarea);
    mostrarLista();

    nameTask.value = "";
    nameDesc.value = "";
    nameDate.value = "";
});

function mostrarLista() {
    taskList.innerHTML = "";
    tareas.forEach((tarea) => {
        const li = document.createElement("li");
        li.textContent = `${tarea.nombre} - ${tarea.descripcion} - ${tarea.fecha}`;
        li.className = tarea.completada ? "completada" : "";
        taskList.appendChild(li);

        li.addEventListener("click", function () {
        tarea.completada = !tarea.completada;
        li.classList.toggle("completada");
        });

    li.addEventListener("dblclick", function (){
        tareas = tareas.filter(t => t !== tarea);
        mostrarLista();
        });
    });

    

    taskList.appendChild(li);
}


