const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const emptyMessage = document.getElementById("empty-message");
            
// Function to add a new task
function addTask() {
    // Get the task text from input box
    const taskText = inputBox.value.trim();
                
    // Check if input is empty
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }
                
    // Create new list item
    const li = document.createElement("li");
                
    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
                
    // Create task text
    const taskSpan = document.createElement("span");
    taskSpan.textContent = taskText;
    taskSpan.style.position = "static";
    taskSpan.style.color = "#000";
    taskSpan.style.fontSize = "17px";
    taskSpan.style.marginLeft = "10px";
                
    // Create delete button (X)
    const deleteSpan = document.createElement("span");
    deleteSpan.innerHTML = "x";
    deleteSpan.title = "Delete this task";
                
                // Add event listener to delete button
    deleteSpan.addEventListener("click", function(e) {
        e.stopPropagation(); // Prevent triggering the li click event
        li.remove();
        checkEmptyList();
        saveData();
    });
                
    // Add checkbox and text to list item
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(deleteSpan);
                
    // Add event listener to mark task as completed
    li.addEventListener("click", function(e) {
    // Only toggle if not clicking on delete button
    if (e.target !== deleteSpan && !deleteSpan.contains(e.target)) {
            this.classList.toggle("checked");
            checkbox.checked = !checkbox.checked;
            saveData();
        }
    });
                
    // Add the new task to the list
    listContainer.appendChild(li);
                
    // Clear the input box
    inputBox.value = "";
                
    // Focus back to input box
    inputBox.focus();
                
    // Hide empty message
    emptyMessage.style.display = "none";
                
    // Save data to local storage
    saveData();
    }
            
            // Function to check if list is empty
    function checkEmptyList() {
        if (listContainer.children.length === 0) {
            emptyMessage.style.display = "block";
        } else {
            emptyMessage.style.display = "none";
        }
    }
            
            // Function to save data to local storage
    function saveData() {
        const tasks = [];
        const listItems = listContainer.getElementsByTagName("li");
                
        for (let i = 0; i < listItems.length; i++) {
        const li = listItems[i];
        const taskText = li.querySelector("span:not([title])").textContent;
        const isChecked = li.classList.contains("checked");
                    
        tasks.push({
            text: taskText,
            checked: isChecked
        });
        }
                
         localStorage.setItem("todoData", JSON.stringify(tasks));
        }
            
            // Function to load data from local storage
            function loadData() {
                const savedData = localStorage.getItem("todoData");
                
                if (savedData) {
                    const tasks = JSON.parse(savedData);
                    
                    tasks.forEach(task => {
                        // Create list item
                        const li = document.createElement("li");
                        
                        // Create checkbox
                        const checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        
                        // Create task text
                        const taskSpan = document.createElement("span");
                        taskSpan.textContent = task.text;
                        taskSpan.style.position = "static";
                        taskSpan.style.color = "#000";
                        taskSpan.style.fontSize = "17px";
                        taskSpan.style.marginLeft = "10px";
                        
                        // Create delete button
                        const deleteSpan = document.createElement("span");
                        deleteSpan.innerHTML = "x";
                        deleteSpan.title = "Delete this task";
                        
                        // Add event listener to delete button
                        deleteSpan.addEventListener("click", function(e) {
                            e.stopPropagation();
                            li.remove();
                            checkEmptyList();
                            saveData();
                        });
                        
                        // Add elements to list item
                        li.appendChild(checkbox);
                        li.appendChild(taskSpan);
                        li.appendChild(deleteSpan);
                        
                        // If task was checked, mark it as completed
                        if (task.checked) {
                            li.classList.add("checked");
                            checkbox.checked = true;
                        }
                        
                        // Add event listener to mark task as completed
                        li.addEventListener("click", function(e) {
                            if (e.target !== deleteSpan && !deleteSpan.contains(e.target)) {
                                this.classList.toggle("checked");
                                checkbox.checked = !checkbox.checked;
                                saveData();
                            }
                        });
                        
                        // Add to list container
                        listContainer.appendChild(li);
                    });
                    
                    // Check if list is empty
                    checkEmptyList();
                } else {
                    // Show empty message if no data
                    emptyMessage.style.display = "block";
                }
            }
            
            // Allow adding task by pressing Enter key
            inputBox.addEventListener("keypress", function(event) {
                if (event.key === "Enter") {
                    addTask();
                }
            });
            
            // Load saved tasks when page loads
            window.onload = function() {
                loadData();
                
                // If there are no tasks saved, show empty message
                if (listContainer.children.length === 0) {
                    emptyMessage.style.display = "block";
                }
            };