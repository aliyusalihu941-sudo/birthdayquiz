// Get references to elements
const taskInput = document.getElementById('task-input');
const addButton = document.getElementById('add-button');
const taskList = document.getElementById('task-list');

const STORAGE_KEY = 'talents_hive_tasks_v1';

// Load tasks from localStorage (if any)
let tasks = loadTasksFromStorage();
renderTasks();

// Add Task function
function addTask() {
  const text = taskInput.value.trim();
  if (!text) return; // ignore empty input

  const task = {
    id: Date.now().toString(),
    text,
    completed: false
  };

  tasks.push(task);
  saveTasksToStorage();
  appendTaskToDOM(task);
  taskInput.value = '';
  taskInput.focus();
}

// Create DOM for a single task and append it
function appendTaskToDOM(task) {
  const li = document.createElement('li');
  li.className = 'task-item';
  li.dataset.id = task.id;

  // Task text element (clicking toggles completed)
  const span = document.createElement('div');
  span.className = 'task-text';
  span.textContent = task.text;

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.className = 'delete-button';
  delBtn.setAttribute('aria-label', 'Delete task');
  delBtn.textContent = '✕';

  // Apply completed style if needed
  if (task.completed) {
    li.classList.add('completed-task');
  }

  // When clicking the text, toggle completed
  span.addEventListener('click', () => {
    toggleTaskCompleted(task.id, li);
  });

  // When clicking delete, remove the task
  delBtn.addEventListener('click', (e) => {
    // prevent the click from also toggling completed via parent handlers
    e.stopPropagation();
    deleteTask(task.id, li);
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

// Toggle completed state for a task
function toggleTaskCompleted(taskId, liElement) {
  const idx = tasks.findIndex(t => t.id === taskId);
  if (idx === -1) return;
  tasks[idx].completed = !tasks[idx].completed;
  saveTasksToStorage();

  liElement.classList.toggle('completed-task', tasks[idx].completed);
}

// Delete a task
function deleteTask(taskId, liElement) {
  tasks = tasks.filter(t => t.id !== taskId);
  saveTasksToStorage();
  if (liElement && liElement.parentElement) {
    liElement.parentElement.removeChild(liElement);
  } else {
    renderTasks();
  }
}

// Render all tasks (use on load or full refresh)
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach(t => appendTaskToDOM(t));
}

// Local Storage helpers
function saveTasksToStorage() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error('Could not save tasks to localStorage', e);
  }
}

function loadTasksFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Could not load tasks from localStorage', e);
    return [];
  }
}

// Event listeners
addButton.addEventListener('click', addTask);

// Allow pressing Enter in input to add task
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addTask();
});

