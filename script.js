document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = ''; 

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];

            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${task.text}</span>
                <button class="deleteButton" data-index="${i}">Удалить</button>
            `;

            taskList.appendChild(listItem);
        }
    }

    function addTask() {
        const taskText = taskInput.value.trim(); 

        if (taskText !== '') {
            tasks.push({ text: taskText }); 

            localStorage.setItem('tasks', JSON.stringify(tasks)); 
            taskInput.value = ''; 

            renderTasks(); 
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1); 

        localStorage.setItem('tasks', JSON.stringify(tasks));

        renderTasks(); 
    }

    addButton.addEventListener('click', addTask);

    taskList.addEventListener('click', function(event) {
        if (event.target.classList.contains('deleteButton')) {
            const index = event.target.dataset.index;
            deleteTask(index);
        }
    });

    renderTasks();
});