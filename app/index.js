import * as TasksModule from "./tareas.js";

// Selectores
const inputTask = document.querySelector('#task-input');
const form = document.querySelector('#main-form');
const formBtn = document.querySelector('#main-form-btn');
const tasksList = document.querySelector('#task-list');

// Regex
const TEXT_REGEX = /^[A-Z\u00d1][a-z\u00f1]*[a-z\u00f1]{1,}[ ]{0}$/;

// Validaciones
let isInputTaskValid = false;


// Funciones
const renderInputValidationStatus = (input, isInputValid) => {
const helperText = input.nextElementSibling;
if (input.value === '') {
    // Quitar los colores y no mostrar el texto de ayuda.
    input.classList.remove('input-invalid');
    input.classList.remove('input-valid');
    helperText?.classList.remove('show-helper-text');
} else if (isInputValid) {
    // Ponerse verde y ocultar el texto de ayuda.
    input.classList.add('input-valid');
    input.classList.remove('input-invalid');
    helperText?.classList.remove('show-helper-text');
} else {
    // Ponerse rojo y mostrar el texto de ayuda.
    input.classList.add('input-invalid');
    input.classList.remove('input-valid');
    helperText?.classList.add('show-helper-text');
}
}

const renderFormBtnValidationStatus = () => {
if (isInputTaskValid) {
    formBtn.disabled = false;
} else {
    formBtn.disabled = true;
}
}


// Eventos
inputTask.addEventListener('input', e => {
isInputTaskValid = TEXT_REGEX.test(inputTask.value);
renderInputValidationStatus(inputTask, isInputTaskValid);
renderFormBtnValidationStatus();
});


form.addEventListener('submit', e => {
    //Validar si las validaciones estan correctas
    if (!isInputTaskValid) {
        return;
    }
  //1. Prevenir el evento predefinido
e.preventDefault();
  // 2. Crear la estructura del contacto
const newTask = {
    id: crypto.randomUUID(),
    task: inputTask.value,
}
  // 3. Guardar el tarea en el array
TasksModule.addTask(newTask);
  // 4. Guardar el tarea en el navegador
TasksModule.saveTasksInBrowser();
  // 5. Mostrar tareas en el html
TasksModule.renderTasks(tasksList);
});

tasksList.addEventListener('click', e => {
const deleteBtn = e.target.closest('.task-item-delete-button');
const editBtn = e.target.closest('.task-item-check-button');

if (deleteBtn) {
    // 1. Obtener el id
    const li = deleteBtn.parentElement;
    // 2. Eliminar la tarea del array
    TasksModule.removeTask(li.id);
    // 3. Guardar los tareas en el navegador
    TasksModule.saveTasksInBrowser();
    // 4. Renderizar los tareas
    TasksModule.renderTasks(tasksList);
}

if (editBtn) {
    // 1. Obtener el id
    const li = editBtn.parentElement;
    // 2. Obtener ambos inputs
    const taskInput = li.children[0];
    const status = li.getAttribute('status');
    
    if (status === 'disabled-inputs') {
      // 1. Cambiar el status a enabled-inputs
    li.setAttribute('status', 'enabled-inputs');
      // 2. Cambiar el icono del btn
    editBtn.innerHTML = TasksModule.editingIcon;
      // 3. Habilitar los inputs
    taskInput.removeAttribute('readonly');
    }

    if (status === 'enabled-inputs') {
      // 1. Cambiar el status a disabled-inputs
    li.setAttribute('status', 'disabled-inputs');
      // 2. Cambiar el icono del btn
    editBtn.innerHTML = TasksModule.deleteIcon;
      // 3. Deshabilitar los inputs
    taskInput.setAttribute('readonly', true);
      // 4. Actualizar el tarea
    const updatedTask = {
        id: li.id,
        name: taskInput.value,
    }
    TasksModule.updateTask(updatedTask);
      // 5. Guardar en el navegador
    TasksModule.saveTasksInBrowser();
      // 6. Mostrar en el html
    TasksModule.renderTasks(tasksList);
    }
}
});

window.onload = () => {
  // 1. Obtener la lista de localStorage
TasksModule.getTasksFromBrowser();
  // 2. Renderizar las tareas
TasksModule.renderTasks(tasksList);
}