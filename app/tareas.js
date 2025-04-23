/** 
  * @typedef Contact
  * @type {object}
  * @property {string} id El id del contacto
  * @property {string} task Texto de la tarea
*/

/** @type {Task[]} */
let tasks = [];

/**
 * Agrega un tarea al array de tareas
 * @param {Task} newTask 
 */
const addTask = (newTask) => {
tasks = tasks.concat(newTask);
}

// Icons
const checkIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
`;

const editingIcon = `
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
`;
const deleteIcon=`
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>
`;
const editIcon=`
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-9">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>
`;
/**
 * Renderiza los tareas
 * @param {Element} list La lista en el html donde vamos a cargar los tareas
 */
const renderTasks = (list) => {
  // Borrar la lista del html
list.innerHTML = '';
  // 1. Por cada contacto del array creo y agrego el contacto al HTML.
tasks.forEach(task => {
    // 1. Crear el li 
    const li = document.createElement('li');
    // 2. Agregar la clase al li
    li.classList.add('tasks-list-item');
    // 3. Agregar el id al li
    li.id = task.id;
    // 3.1 Establecer el estatus
    li.setAttribute('status', 'disabled-inputs');
    // 4. Crear div del input
    const inputsDiv = `
    <div class="task-container">
          <input type="text" class="task-item-text" value="${task.task}" readonly>

        </div>
    `;
    // 5. Crear div de los botones
    const btnsDiv = `
    <button class="task-item-check-button">
        ${checkIcon}           
    </button>
    <button class="task-item-delete-button"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-7">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
  <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
</svg>

    `;
    // 6. Crear la estructura del li
    const liChildren = `
    ${inputsDiv}
    ${btnsDiv}
    `;
    li.innerHTML = liChildren;    
    // 7. Agregar el li a la ul
    list.appendChild(li);
});
}

/**
 * Guarda el array de los tareas en el navegador
 */
const saveTasksInBrowser = () => {
localStorage.setItem('tasks', JSON.stringify(tasks));
}


/**
 * Obtener los tareas del navegador y guardarlos en el array.
 */
const getTasksFromBrowser = () => {
  // 1. Obtener la lista de localStorage
const tasksLocalJson = localStorage.getItem('tasks');
  // 2. Transformar de JSON a JavaScript
const tasksLocal = JSON.parse(tasksLocalJson);
  // 3. Guardar los tareas
tasks = tasksLocal ?? [];
}

/**
 * Elimina un contacto del array de tareas
 * @param {string} id El id del contacto a eliminar
 */
const removeTask = (id) => {
tasks = tasks.filter(task => task.id !== id);
}

/**
 * Actualizar un contacto
 * @param {Task} updatedTask El contacto actualizado
*/
const updateTask = (updatedTask) => {
tasks = tasks.map(task => {
    if (task.id === updatedTask.id) {
    return updatedTask;
    } else {
    return task;
    } 
});
}

export {
addTask,
renderTasks,
saveTasksInBrowser,
getTasksFromBrowser,
removeTask,
updateTask,
  checkIcon,
  editingIcon,
  deleteIcon,
  editIcon
}