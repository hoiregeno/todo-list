document.addEventListener("DOMContentLoaded", () => {
  // Grab the input and ul element from index.html
  const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");

  // Add events to inputBox and listContainer.
  inputBox.addEventListener("keypress", addTask); // Listens for key press
  listContainer.addEventListener("click", checkTask);
  listContainer.addEventListener("contextmenu", deleteTask); // Listens for right click

  // Adds a new task to the list.
  function addTask(event){
    if(event.key === "Enter") {
      if(inputBox.value === "") {
        alert("Please enter something.");	// displays an error message if user enters nothing.
        return; // Exit function. Do nothing.
      }

      let li = document.createElement("li"); // if user entered something, create an 'li' element to the DOM.
      li.innerHTML = inputBox.value;         // set the text content to whatever the user entered.
      listContainer.appendChild(li);	       // adds the li element to the listContainer.

      inputBox.value = "";	// resets the input field.
      saveTask();	// update the list after task is entered.
    }
  }

  // Marks a task as complete when user left clicks mouse.
  function checkTask(event){
    const task = event.target; // Grab the task and store it in a variable so we can reuse it.

    if(task.tagName === "LI") {
      task.classList.toggle("checked");
      saveTask();	// update the list when task is marked.
    }
  }

  // Deletes a task when user right clicks mouse.
  function deleteTask(event){
    event.preventDefault(); // Prevents context menu from popping up.
    
    const task = event.target; // Grab the task and store it in a variable so we can reuse it.
    if(task.tagName === "LI") {
      task.remove(); // if the tag name is LI. Remove it from the DOM.
      saveTask();    // update the list when task is deleted.
    }
  }

  // Saves the list to local storage. Helps us update the list.
  function saveTask() {
    localStorage.setItem("tasks", listContainer.innerHTML);
  }

  // Loads the list to the browser.
  function loadTask() {
    const tasks = localStorage.getItem("tasks");
    if(tasks){
      listContainer.innerHTML = tasks;
    }
  }

  loadTask();	// Load the updated list right away.
});