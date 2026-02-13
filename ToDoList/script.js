const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

window.addEventListener('load', function() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        
        const allTasks = taskList.querySelectorAll('li');
        allTasks.forEach(function(li) {
            attachEventListeners(li);
        });
    }
});

addTaskButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value;
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const li = document.createElement('li');
    li.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;


    attachEventListeners(li);
    
    taskList.appendChild(li);
    taskInput.value = '';

    localStorage.setItem('tasks', taskList.innerHTML);
}

function attachEventListeners(li) {
    li.addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON') return;
        li.classList.toggle('completed');

        localStorage.setItem('tasks', taskList.innerHTML);
    });

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(li);

        localStorage.setItem('tasks', taskList.innerHTML);
    });

    taskList.appendChild(li);
    taskInput.value = '';
}