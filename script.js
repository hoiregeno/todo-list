const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// this is for the INPUT FIELD.
inputBox.addEventListener("keypress", function(event) {
	if(event.key === "Enter") {
		// if input field is empty...
		if(inputBox.value === "") {
			alert("Please enter something.");	// displays a warning.
		}
		else {
			// if input is filled in, an 'li' element is created.
			let li = document.createElement("li");
			li.innerHTML = inputBox.value;
			listContainer.appendChild(li);	// adds the list.
			saveTask();	// SAVES THE LIST.
		}
		inputBox.value = "";	// resets the input field.
	}
});

// EVENT LISTENER FOR LEFT CLICK.
listContainer.addEventListener("click", function(event) {
	if(event.target.tagName === "LI") {
		event.target.classList.toggle("checked");
		saveTask();	// SAVES THE LIST.
	}
});

// EVENT LISTENER FOR RIGHT CLICK.
listContainer.addEventListener("contextmenu", function(event) {
	event.preventDefault();
	if(event.target.tagName === "LI") {
		event.target.remove();
		saveTask();	// SAVES THE LIST.
	}
});

// function to SAVE THE LISTS TO LOCAL STORAGE.
function saveTask() {
	localStorage.setItem("tasks", listContainer.innerHTML);
}

// function to LOAD THE LISTS TO THE WEB BROWSER.
function loadTask() {
	listContainer.innerHTML = localStorage.getItem("tasks");
}

loadTask();	// invoke the function.