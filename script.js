// Grab the input and ul element from index.html
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// Add an event listener to the input box.
inputBox.addEventListener("keypress", function(event) {
	if(event.key === "Enter") {
		if(inputBox.value === "") {
			alert("Please enter something.");	// displays an error message if user enters nothing.
		}
		else {
			let li = document.createElement("li"); // if user entered something, create an 'li' element to the DOM.
			li.innerHTML = inputBox.value;  // set the text content to whatever the user entered.
			listContainer.appendChild(li);	// adds the li element to the listContainer.

			saveTask();	// save the list to local storage after task is entered.
		}
		inputBox.value = "";	// resets the input field.
	}
});

// Marks a task as complete when user left clicks mouse.
listContainer.addEventListener("click", function(event) {
	if(event.target.tagName === "LI") {
		event.target.classList.toggle("checked");
		saveTask();	// save the list to local storage when task is marked.
	}
});

// Deletes a task when user right clicks mouse.
listContainer.addEventListener("contextmenu", function(event) {
	event.preventDefault(); // Prevents context menu from popping up.
  
	if(event.target.tagName === "LI") {
		event.target.remove(); // if the tag name is LI. Remove it from the DOM.
		saveTask();            // save the list to local storage when task is deleted.
	}
});

// Saves the list to local storage.
function saveTask() {
	localStorage.setItem("tasks", listContainer.innerHTML);
}

// Loads the list to the browser.
function loadTask() {
	listContainer.innerHTML = localStorage.getItem("tasks");
}

loadTask();	// Loading the saved list right away when app begins.