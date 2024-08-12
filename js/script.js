        // Menu déroulant
        document.addEventListener('DOMContentLoaded', function() {
            const menuToggle = document.querySelector('.menu-toggle');
            const sidebarList = document.querySelector('.sidebar-list');
            const dropdownIcon = document.querySelector('.menu-toggle .material-icons');
    
            menuToggle.addEventListener('click', function() {
                if (sidebarList.style.maxHeight) {
                    sidebarList.style.maxHeight = null;
                    sidebarList.style.opacity = '0';
                    dropdownIcon.style.transform = 'rotate(0deg)';
                } else {
                    sidebarList.style.maxHeight = sidebarList.scrollHeight + 'px';
                    sidebarList.style.opacity = '1';
                    dropdownIcon.style.transform = 'rotate(180deg)';
                }
            });
        });
    
        //calendrier
        document.addEventListener('DOMContentLoaded', function () {
        const calendarEl = document.getElementById('calendar');
        const monthYearEl = document.getElementById('monthYear');
        const monthSelector = document.getElementById('monthSelector');
    
        let currentDate = new Date();
    
        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            const today = new Date();
    
            monthYearEl.textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
    
            // Clear the calendar
            calendarEl.innerHTML = '';
    
            // Header with days of the week
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            daysOfWeek.forEach(day => {
                const div = document.createElement('div');
                div.className = 'header';
                div.textContent = day;
                calendarEl.appendChild(div);
            });
    
            // Fill in the days
            for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
                calendarEl.appendChild(document.createElement('div'));
            }
    
            const todayDate = today.getDate();
            const todayMonth = today.getMonth();
            const todayYear = today.getFullYear();
    
            for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
                const div = document.createElement('div');
                div.textContent = day;
    
                // Add 'today' class if this is the current date
                if (day === todayDate && month === todayMonth && year === todayYear) {
                    div.className = 'today';
                }
    
                calendarEl.appendChild(div);
            }
        }
    
        // Update calendar when month is selected
        monthSelector.addEventListener('change', function () {
            const selectedMonth = parseInt(this.value);
            currentDate.setMonth(selectedMonth);
            renderCalendar();
        });
    
        // Initial render
        renderCalendar();
    });

    
    //task
    document.addEventListener('DOMContentLoaded', () => {
        const createTaskBtn = document.getElementById('create-task-btn');
        const taskForm = document.getElementById('task-form');
        const saveTaskBtn = document.getElementById('save-task-btn');
        const addStepBtn = document.getElementById('add-step-btn');
        const stepsContainer = document.getElementById('steps-container');
        const workList = document.getElementById('work-list');
        const personalList = document.getElementById('personal-list');
    
        //mampipoitra ilay formulaire
        createTaskBtn.addEventListener('click', () => {
            resetTaskForm();
            taskForm.style.display = 'block'; 
        });
    
        addStepBtn.addEventListener('click', () => {
            const stepInput = document.createElement('input');
            stepInput.type = 'text';
            stepInput.className = 'step-input';
            stepInput.placeholder = 'Enter a step';
            stepsContainer.appendChild(stepInput);
        });
        // document.getElementById('add-step-btn').addEventListener('click', function() {
        //     var stepsContainer = document.getElementById('steps-container');
        //     var newStepInput = document.createElement('input');
        //     newStepInput.type = 'text';
        //     newStepInput.className = 'step-input';
        //     newStepInput.placeholder = 'Enter a step';
        //     stepsContainer.appendChild(newStepInput);
        // });
        
    
        saveTaskBtn.addEventListener('click', () => {
            const taskType = document.getElementById('task-type').value;
            const taskTitle = document.getElementById('task-title').value;
            const taskDescription = document.getElementById('task-description').value;
    
            const stepInputs = document.querySelectorAll('.step-input');
            const taskSteps = Array.from(stepInputs).map(input => input.value.trim()).filter(step => step);
    
            if (taskTitle.trim() === '') {
                alert('Title is required!');
                return;
            }
    
            const task = {
                id: Date.now(), //manome iD unique
                type: taskType,
                title: taskTitle,
                description: taskDescription,
                steps: taskSteps
            };
    
            // Save task to localStorage
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
    
            // Display task
            displayTask(task);
    
            // Reset form and hide it
            resetTaskForm();
            taskForm.style.display = 'none'; // Hide the form
        });
        function displayTask(task) {
            const listItem = document.createElement('li');
            listItem.className = 'list-item';
            listItem.dataset.id = task.id; // Store the task ID in a data attribute
            listItem.innerHTML = `
                <div class="task-header">
                    <h3>${task.title}</h3>
                    <button class="delete-btn">Delete</button>
                </div>
                <p class="task-descri">${task.description}</p>
                <ul class="task-steps">
                    ${task.steps.map((step, index) => `
                        <li>
                            <input type="checkbox" id="step-${task.id}-${index}">
                            <label for="step-${task.id}-${index}" class="checkbox-label">${step}</label>
                        </li>
                    `).join('')}
                </ul>
            `;
        
            // Add event listener to the delete button
            listItem.querySelector('.delete-btn').addEventListener('click', () => {
                deleteTask(task.id, listItem);
            });
        
            // Get the content container
            const contentContainer = document.querySelector('.col-8.content');
            
            // Clear existing content in both lists
            if (task.type === 'work') {
                workList.appendChild(listItem); // Add to Work List in Overview
            } else {
                personalList.appendChild(listItem); // Add to Personal List in Overview
            }
        
            // Also add to Main Content
            contentContainer.appendChild(listItem);
        }
        
        
    
    
        function deleteTask(taskId, listItem) {
            // Get existing tasks from localStorage
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            
            // Remove the task from the array
            tasks = tasks.filter(task => task.id !== taskId);
    
            // Save updated tasks to localStorage
            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            // Remove task from the DOM
            listItem.remove();
        }
    
        function resetTaskForm() {
            // Réinitialisez les valeurs des champs du formulaire
            document.getElementById('task-type').value = 'work'; // Valeur par défaut
            document.getElementById('task-title').value = '';
            document.getElementById('task-description').value = '';
            
            // Réinitialisez les étapes
            const stepsContainer = document.getElementById('steps-container');
            stepsContainer.innerHTML = '<input type="text" class="step-input" placeholder="Enter a step">';
        }
    
        // function loadTasks() {
        //     const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        //     tasks.forEach(displayTask);
        // }
        function loadTasks() {
        // Clear existing tasks
        workList.innerHTML = '';
        personalList.innerHTML = '';
    
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(displayTask);
    }
    
    
        loadTasks();
    });

    // expense-tracker
    // Variables globales
let totalIncome = 0;
let totalExpense = 0;

// Fonction pour ajouter une transaction
function addTransaction(type, name, amount) {
    const transactionList = document.getElementById('transaction-list');
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.classList.add(type === 'income' ? 'bg-success' : 'bg-danger');
    listItem.innerHTML = `
        ${name} <span class="badge badge-light">$${amount.toFixed(2)}</span>
    `;
    transactionList.appendChild(listItem);

    if (type === 'income') {
        totalIncome += amount;
    } else {
        totalExpense += amount;
    }
    updateTotals();
}

// Fonction pour mettre à jour les totaux affichés
function updateTotals() {
    document.getElementById('total-income').textContent = totalIncome.toFixed(2);
    document.getElementById('total-expense').textContent = totalExpense.toFixed(2);
    document.getElementById('net-total').textContent = (totalIncome - totalExpense).toFixed(2);
}

// Fonction pour gérer l'événement de soumission du formulaire
document.getElementById('transaction-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const type = document.getElementById('transaction-type').value;
    const name = document.getElementById('transaction-name').value;
    const amount = parseFloat(document.getElementById('transaction-amount').value);

    if (name && amount > 0) {
        addTransaction(type, name, amount);
        this.reset();
    } else {
        alert('Please provide a valid transaction name and amount.');
    }
});

// Fonction pour réinitialiser le tracker
function resetTracker() {
    totalIncome = 0;
    totalExpense = 0;
    document.getElementById('transaction-list').innerHTML = '';
    updateTotals();
    localStorage.removeItem('totalIncome');
    localStorage.removeItem('totalExpense');
    localStorage.removeItem('transactions');
}

// Fonction pour sauvegarder les données dans le localStorage
function saveData() {
    localStorage.setItem('totalIncome', totalIncome.toFixed(2));
    localStorage.setItem('totalExpense', totalExpense.toFixed(2));
    localStorage.setItem('transactions', JSON.stringify([...document.querySelectorAll('#transaction-list .list-group-item')].map(item => ({
        type: item.classList.contains('bg-success') ? 'income' : 'expense',
        name: item.childNodes[0].textContent.trim(),
        amount: parseFloat(item.querySelector('.badge').textContent.replace('$', ''))
    }))));
}

// Fonction pour charger les données depuis le localStorage
function loadData() {
    const storedIncome = localStorage.getItem('totalIncome');
    const storedExpense = localStorage.getItem('totalExpense');
    const storedTransactions = localStorage.getItem('transactions');

    if (storedIncome !== null) totalIncome = parseFloat(storedIncome);
    if (storedExpense !== null) totalExpense = parseFloat(storedExpense);
    if (storedTransactions !== null) {
        const transactions = JSON.parse(storedTransactions);
        transactions.forEach(({ type, name, amount }) => addTransaction(type, name, amount));
    }

    updateTotals();
}

// Charger les données lorsque la page est chargée
window.addEventListener('load', loadData);

// Enregistrer les données avant de quitter la page
window.addEventListener('beforeunload', saveData);

// Ajouter un événement au bouton de réinitialisation
document.getElementById('reset-btn').addEventListener('click', resetTracker);






    //notes
    document.addEventListener('DOMContentLoaded', () => {
        const noteForm = document.getElementById('note-form');
        const noteTitleInput = document.getElementById('note-title');
        const noteContentInput = document.getElementById('note-content');
        const notesList = document.getElementById('notes-list');

        noteForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const title = noteTitleInput.value;
            const content = noteContentInput.value;

            if (title && content) {
                addNoteToList(title, content);
                noteTitleInput.value = '';
                noteContentInput.value = '';
            }
        });

        function addNoteToList(title, content) {
            const noteItem = document.createElement('div');
            noteItem.className = 'note-item';
            noteItem.innerHTML = `
                <div class="note-content">
                    <strong>${title}</strong>
                    <p>${content}</p>
                </div>
                <button class="btn btn-danger btn-sm delete-btn">Delete</button>
            `;
            notesList.appendChild(noteItem);

            const deleteBtn = noteItem.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                notesList.removeChild(noteItem);
            });
        }
    });