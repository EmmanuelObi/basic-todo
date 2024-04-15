// Global scoped variables

const displayLeftContainer = document.getElementById("left-container");
const displayRightContainer = document.getElementById("right-container");
const addTodoButton = document.getElementById("add-icon");
const singleTodo = document.querySelectorAll("#single-todo");
const todoList = document.getElementById("todo-list");
const formHeader = document.getElementById("form-header");
const saveButton = document.getElementById("save-todo");
const username = document.getElementById("username");

let allTodos = [];
let activeEdit;

// Event listeners
saveButton.addEventListener("click", saveTodo);

addTodoButton.addEventListener("click", clickAddTodo);

// Event listener for Enter key
document.getElementById("todo").addEventListener("keydown", function (e) {
  if (e.code === "Enter") {
    if (formHeader.textContent === "Edit Todo") {
      editTodo();

      return;
    } else {
      saveTodo();

      return;
    }
  }
});

// functions for READ, CREATE, UPDATE, and DELETE todos
function displayTodos() {
  todoList.innerHTML = "";
  if (allTodos.length === 0) {
    const emptySlot = document.createElement("div");
    emptySlot.classList.add(
      "w-full",
      "text-center",
      "flex",
      "justify-center",
      "items-center",
      "min-h-28"
    );
    emptySlot.innerHTML = `
      <div class="flex flex-col mt-16 justify-center items-center">
        <img class="w-[calc(80%)]" src="../src/assets/images/empty.png" alt="empty" />
        <p class="min-h-48 pt-16">No plans set for today</p>
      </div>
    `;

    todoList.appendChild(emptySlot);

    return;
  }

  allTodos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.id = "single-todo";
    todoItem.classList.add(
      "flex",
      "justify-between",
      "items-center",
      "min-w-80",
      "my-1",
      "w-5/6",
      "lg:w-[calc(47%)]",
      "drop-shadow-md",
      "bg-white",
      "rounded-lg",
      "p-6",
      "flex-wrap"
    );
    todoItem.innerHTML = `
        ${
          !todo?.isCompleted
            ? `<div
            onclick="setTodoComplete(${todo?.id})"
            class="w-6 h-6 rounded-full border-1 cursor-pointer border-deep-blue"
        ></div>`
            : `<img
            src="../src/assets/images/check.svg"
            alt="check"
            class="cursor-pointer"
            onclick="setTodoComplete(${todo?.id})"
          />`
        }
        
          <p class="${
            todo?.isCompleted ? "line-through text-grey" : "text-deep-blue"
          } text-sm text-wrap text-center max-w-40 lg:max-w-72 font-medium">
            ${truncate(todo?.text, 35)}
          </p>
          <div class="flex justify-between items-center gap-3">
            <span class="cursor-pointer" onclick="clickEditTodo(${
              todo?.id
            })"><i class="fa fa-lg fa-pencil" aria-hidden="true"></i></span>
            <span class="cursor-pointer" onclick="deleteTodo(${
              todo?.id
            })"><i class="fa fa-lg fa-trash" aria-hidden="true"></i></span>
        
          </div>
    `;
    todoList.appendChild(todoItem);
  });
}

function setTodoComplete(id) {
  allTodos = allTodos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        isCompleted: !todo.isCompleted,
      };
    } else {
      return todo;
    }
  });

  displayTodos();
}

function editTodo() {
  const todoText = document.getElementById("todo").value;

  if (todoText === "") {
    alert("No task entered");
    return;
  }

  let checkingExistence = allTodos.find((item) => item.text === todoText);

  if (checkingExistence) {
    alert("This task already exists");
    return;
  }

  allTodos = allTodos.map((todo) => {
    if (todo.id === activeEdit) {
      return {
        ...todo,
        text: todoText,
      };
    } else {
      return todo;
    }
  });

  displayTodos();

  hideForm();
  document.getElementById("todo").value = "";
}

function deleteTodo(id) {
  allTodos = allTodos.filter((todo) => todo.id !== id);
  displayTodos();
}

function saveTodo() {
  if (formHeader.textContent === "Edit Todo") {
    editTodo();

    return;
  }
  const todo = document.getElementById("todo").value;

  if (todo === "") {
    alert("No task entered");

    return;
  }

  let checkingExistence = allTodos.find((item) => item.text === todo);

  if (checkingExistence) {
    alert("This task already exists");
    return;
  }

  const maxId = allTodos.reduce((max, item) => Math.max(max, item.id), 0);

  let newData = {
    id: maxId + 1,
    text: todo,
    isCompleted: false,
  };

  allTodos.push(newData);
  displayTodos();
  document.getElementById("todo").value = "";
  hideForm();
}

function clickAddTodo() {
  formHeader.textContent = "Add New Todo";
  displayTodos();
  showForm();
}

function clickEditTodo(id) {
  formHeader.textContent = "Edit Todo";
  const todo = allTodos.find((todo) => todo.id === id);
  activeEdit = todo.id;
  document.getElementById("todo").value = todo.text;
  showForm();
}

function showForm() {
  if (displayLeftContainer.classList.contains("w-full")) {
    displayLeftContainer.classList.remove("w-full");
    displayLeftContainer.classList.add(
      "hidden",
      "lg:block",
      "lg:w-[calc(45%)]"
    );
    displayRightContainer.classList.remove("hidden");
    displayRightContainer.classList.add("block");
    todoList.classList.remove("justify-between");
    todoList.classList.add("justify-center");
    singleTodo.forEach((item) => {
      item.classList.remove("lg:w-[calc(45%)]");
    });
  }
}

function hideForm() {
  if (displayRightContainer.classList.contains("block")) {
    displayLeftContainer.classList.remove(
      "hidden",
      "lg:block",
      "lg:w-[calc(45%)]"
    );
    displayLeftContainer.classList.add("w-full");
    displayRightContainer.classList.remove("block");
    displayRightContainer.classList.add("hidden");
    todoList.classList.add("justify-between");
    todoList.classList.remove("justify-center");
    singleTodo.forEach((item) => item.classList.add("lg:w-[calc(47%)]"));
  }
}

function truncate(str, length) {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }

  return str;
}

displayTodos();
