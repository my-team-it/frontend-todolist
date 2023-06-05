document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
  
    let storedItems = JSON.parse(localStorage.getItem("todos")) || [];
  
    // Populate the to-do list with stored items
    storedItems.forEach(function(item) {
      createListItem(item.task, item.completed);
    });
  
    addButton.addEventListener("click", function() {
      const task = todoInput.value;
      if (task !== "") {
        createListItem(task, false);
  
        storedItems.push({ task: task, completed: false });
        localStorage.setItem("todos", JSON.stringify(storedItems));
  
        todoInput.value = "";
      }
    });
  
    function createListItem(task, completed) {
      const listItem = document.createElement("div");
      listItem.className = "shadow rounded-lg p-4 mb-2 flex items-center justify-between";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completed;
      checkbox.addEventListener("change", function() {
        listItem.classList.toggle("line-through");
  
        const index = storedItems.findIndex(item => item.task === task);
        storedItems[index].completed = !storedItems[index].completed;
        localStorage.setItem("todos", JSON.stringify(storedItems));
      });
  
      const label = document.createElement("label");
      label.textContent = task;
      label.className = "ml-2";
  
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M14.293 5.293a1 1 0 0 0-1.414 0L10 8.586l-2.879-2.88a1 1 0 0 0-1.414 1.414L8.586 10l-2.88 2.879a1 1 0 0 0 1.414 1.414L10 11.414l2.879 2.88a1 1 0 0 0 1.414-1.414L11.414 10l2.88-2.879a1 1 0 0 0 0-1.414z" clip-rule="evenodd"/></svg>';
      deleteButton.className = "ml-4";
      deleteButton.addEventListener("click", function() {
        listItem.remove();
  
        storedItems = storedItems.filter(item => item.task !== task);
        localStorage.setItem("todos", JSON.stringify(storedItems));
      });
  
      listItem.appendChild(checkbox);
      listItem.appendChild(label);
      listItem.appendChild(deleteButton);
  
      if (completed) {
        listItem.classList.add("line-through");
      }
  
      todoList.appendChild(listItem);
    }
  });
  
