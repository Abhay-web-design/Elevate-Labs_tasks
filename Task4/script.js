/* ==========================================================================
   State Management & Mock Data
   ========================================================================== */
   let tasks = [
    {
        id: '1',
        title: "Attend Nischal's Birthday Party",
        description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)\n\n1. A cake, with candles to blow out.\n2. The birthday song.\n3. A place to collect gifts.",
        date: "2023-06-20",
        priority: "Moderate",
        status: "Not Started",
        image: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
        id: '2',
        title: "Landing Page Design for TravelDays",
        description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
        date: "2023-06-20",
        priority: "Moderate",
        status: "In Progress",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: '3',
        title: "Presentation on Final Product",
        description: "Make sure everything is functioning and all the necessities are properly met. Prepare the team and get the documents ready.",
        date: "2023-06-19",
        priority: "Moderate",
        status: "In Progress",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: '4',
        title: "Walk the dog",
        description: "Take the dog to the park and bring treats as well.",
        date: "2023-06-18",
        priority: "Low",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: '5',
        title: "Conduct meeting",
        description: "Meet with the client and finalize requirements.",
        date: "2023-06-18",
        priority: "Extreme",
        status: "Completed",
        image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=300&q=80"
    },
    {
        id: '6',
        title: "Submit Documents",
        description: "Make sure to submit all the necessary documents. Review the list of documents required for submission and ensure all necessary documents are ready.",
        date: "2023-06-20",
        priority: "Extreme",
        status: "Not Started",
        image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=300&q=80"
    }
];

let currentViewId = 'dashboard';
let editingTaskId = null;

/* ==========================================================================
   Initialization & Navigation
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    renderAll();
    
    
});

function initNavigation() {
    const navItems = document.querySelectorAll('.sidebar-nav li');
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Update Active Class
            navItems.forEach(n => n.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Switch View
            const viewName = e.currentTarget.getAttribute('data-view');
            switchView(viewName);

            // Close mobile menu if open
            document.querySelector('.sidebar').classList.remove('open');
            
            // Update Page Title
            if(viewName === 'dashboard') {
                document.getElementById('page-title').textContent = 'board';
            } else {
                let formatted = viewName.charAt(0).toUpperCase() + viewName.slice(1);
                if(formatted === 'Mytasks') formatted = '-Do';
                document.getElementById('page-title').textContent = formatted;
            }
        });
    });
}

function switchView(viewName) {
    const views = document.querySelectorAll('.view-section');
    views.forEach(v => v.classList.remove('active'));
    
    let targetId = `view-${viewName}`;
    const targetEl = document.getElementById(targetId);
    
    if (targetEl) {
        targetEl.classList.add('active');
    } else {
        // Fallback to my tasks view to handle missing sections smoothly
        document.getElementById('view-mytasks').classList.add('active');
    }
    currentViewId = viewName;
    renderAll();
}

/* ==========================================================================
   Render Functions
   ========================================================================== */
function renderAll() {
    renderDashboardLists();
    renderMyTasks();
}

// Render Dashboard
function renderDashboardLists() {
    const todoContainer = document.getElementById('todo-list-container');
    const completedContainer = document.getElementById('completed-list-container');
    
    todoContainer.innerHTML = '';
    completedContainer.innerHTML = '';

    tasks.forEach(task => {
        const taskHTML = createTaskHTML(task);
        if (task.status === 'Completed') {
            completedContainer.insertAdjacentHTML('beforeend', taskHTML);
        } else {
            todoContainer.insertAdjacentHTML('beforeend', taskHTML);
        }
    });

    // Add click event mapping to target specific tasks
   document.querySelectorAll('.task-item').forEach(el => {
    el.addEventListener('click', () => {
        const taskId = el.getAttribute('data-id');

        // Switch to My Tasks view
        switchView('mytasks');

        // Show detail
        renderTaskDetail(taskId);
    });
});
}

// Generate HTML for a task item
function createTaskHTML(task) {
    // Format date string
    const dateObj = new Date(task.date);
    const dateStr = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth()+1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;
    
    const statusClass = task.status.replace(/\s+/g, '.');

    return `
        <div class="task-item priority-${task.priority}" data-id="${task.id}">
            <div class="task-content">
                <h4>${task.title}</h4>
                <p>${task.description.substring(0, 75)}...</p>
                <div class="task-meta">
                    <span>Priority: <span class="priority-text ${task.priority}">${task.priority}</span></span>
                    <span>Status: <span class="status-text ${statusClass}">${task.status}</span></span>
                    <span>Created on: ${dateStr}</span>
                </div>
            </div>
            ${task.image ? `<img src="${task.image}" alt="Task Image" class="task-image">` : ''}
            <div style="position: absolute; right: 16px; top: 16px; color: #ccc;">
               <i class="fa-solid fa-ellipsis"></i>
            </div>

          
        </div>
    `;
}



// Render My Tasks Split View
function renderMyTasks() {
    const listContainer = document.getElementById('mytasks-list-container');
    if(!listContainer) return;
    
    listContainer.innerHTML = '';
    
    tasks.forEach(task => {
        const taskHTML = createTaskHTML(task);
        listContainer.insertAdjacentHTML('beforeend', taskHTML);
    });

    // Attach click for details view
    listContainer.querySelectorAll('.task-item').forEach(el => {
        el.addEventListener('click', () => {
            const taskId = el.getAttribute('data-id');
            renderTaskDetail(taskId);
        });
    });

    // Default load first item detail
    if (tasks.length > 0) {
        renderTaskDetail(tasks[0].id);
    } else {
        document.getElementById('task-detail-panel').innerHTML = '<p style="text-align:center; padding: 40px; color: var(--text-muted);">No tasks available.</p>';
    }
}

function renderTaskDetail(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    const panel = document.getElementById('task-detail-panel');
    const statusClass = task.status.replace(/\s+/g, '.');
    
    const dateObj = new Date(task.date);
    const dateStr = `${dateObj.getDate().toString().padStart(2, '0')}/${(dateObj.getMonth()+1).toString().padStart(2, '0')}/${dateObj.getFullYear()}`;

    // Convert newlines to HTML breaks for description
    const formattedDesc = task.description.replace(/\n/g, '<br>');

    panel.innerHTML = `
        <div class="detail-header">
            <div style="display:flex;">
               ${task.image ? `<img src="${task.image}" class="detail-img">` : ''}
               <div class="detail-info">
                   <h2>${task.title}</h2>
                   <div class="detail-meta">
                       <div>Priority: <span class="priority-text ${task.priority}">${task.priority}</span></div>
                       <div>Status: <span class="status-text ${statusClass}">${task.status}</span></div>
                       <div>Created on: <span>${dateStr}</span></div>
                   </div>
               </div>
            </div>
            <button class="go-back-btn" onclick="switchView('dashboard')">Go Back</button>
        </div>
        
        <div class="detail-desc">
            <h4>Task Title: ${task.title}.</h4>
            <h4>Task Description:</h4>
            <p>${formattedDesc}</p>
        </div>

        <div class="detail-actions">
            <button class="action-btn delete" onclick="deleteTask('${task.id}')"><i class="fa-solid fa-trash"></i></button>
            <button class="action-btn edit" onclick="openModal('edit', '${task.id}')"><i class="fa-solid fa-pen-to-square"></i></button>
            <button class="action-btn alert" onclick="toggleTaskStatus('${task.id}')">Change Status</button>
        </div>
    `;
}

/* ==========================================================================
   Modal & Form Handling (Add/Edit)
   ========================================================================== */
const modalOverlay = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');

function openModal(mode, taskId = null) {
    modalOverlay.classList.add('active');
    
    if (mode === 'edit') {
        document.getElementById('modal-title').textContent = 'Edit Task';
        editingTaskId = taskId;
        
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-date').value = task.date;
            document.getElementById('task-desc').value = task.description;
            document.getElementById('task-status').value = task.status;
            
            // Set radio button
            const radios = document.getElementsByName('priority');
            for (let r of radios) {
                if (r.value === task.priority) {
                    r.checked = true;
                    break;
                }
            }
        }
    } else {
        document.getElementById('modal-title').textContent = 'Add New Task';
        editingTaskId = null;
        taskForm.reset();
        document.getElementById('task-id').value = '';
        
        // Default date to today
        document.getElementById('task-date').valueAsDate = new Date();
    }
}

function closeModal() {
    modalOverlay.classList.remove('active');
    taskForm.reset();
}

// Handle form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('task-title').value;
    const date = document.getElementById('task-date').value;
    const description = document.getElementById('task-desc').value;
    const status = document.getElementById('task-status').value;
    
    let priority = 'Moderate';
    const radios = document.getElementsByName('priority');
    for (let r of radios) {
        if (r.checked) priority = r.value;
    }

    if (editingTaskId) {
        // Edit existing task
        const index = tasks.findIndex(t => t.id === editingTaskId);
        if (index !== -1) {
            tasks[index] = {
                ...tasks[index],
                title, date, description, priority, status
            };
        }
    } else {
        // Add new task
        const newTask = {
            id: Date.now().toString(),
            title,
            date,
            description,
            priority,
            status,
            image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=300&q=80" // Default dummy image
        };
        // Add to beginning of array
        tasks.unshift(newTask);
    }
    
    closeModal();
    renderAll();
});


/* ==========================================================================
   Task Actions
   ========================================================================== */
function deleteTask(id) {
    if(confirm('Are you sure you want to delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        renderAll();
        
        // Clear detail panel if in MyTasks view
        if(currentViewId === 'mytasks') {
            document.getElementById('task-detail-panel').innerHTML = '';
            if(tasks.length > 0) renderTaskDetail(tasks[0].id);
        }
    }
}

// Small utility to toggle status rapidly via the alert button
function toggleTaskStatus(id) {
    const task = tasks.find(t => t.id === id);
    if(task) {
        if(task.status === 'Not Started') task.status = 'In Progress';
        else if(task.status === 'In Progress') task.status = 'Completed';
        else task.status = 'Not Started';
        
        renderAll();
        if(currentViewId === 'mytasks') renderTaskDetail(id);
    }
}