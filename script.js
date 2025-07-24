const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Event listeners
inputBox.addEventListener("keypress", addTask);
listContainer.addEventListener("click", toggleTask);
listContainer.addEventListener("contextmenu", deleteTask);

// Add a new task
function addTask(event) {
  if (event.key === "Enter") {
    const text = inputBox.value.trim();

    if (!text) {
      alert("Please enter something.");
      return;
    }

    createTaskElement(text);
    saveTasks();
    inputBox.value = "";
  }
}

// Toggle completed task
function toggleTask(event) {
  if (event.target.tagName === "LI") {
    event.target.classList.toggle("checked");
    saveTasks();
  }
}

// Delete task on right-click
function deleteTask(event) {
  event.preventDefault();
  if (event.target.tagName === "LI") {
    event.target.remove();
    saveTasks();
  }
}

// Create a list item element
function createTaskElement(text, done = false) {
  const li = document.createElement("li");
  li.textContent = text;
  if (done) li.classList.add("checked");
  listContainer.appendChild(li);
}

// Save tasks as JSON
function saveTasks() {
  const tasks = [...listContainer.querySelectorAll("li")].map(li => ({
    text: li.textContent,
    done: li.classList.contains("checked"),
  }));

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from JSON
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  listContainer.innerHTML = "";
  tasks.forEach(task => createTaskElement(task.text, task.done));
}

loadTasks();