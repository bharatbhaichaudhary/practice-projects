const mainTodoElem = document.querySelector(".todo-lists-elem");
const inputValue = document.getElementById("inputValue");

// let localTodoLists = [];

const getTodoListFromLocal = () => {
  return JSON.parse(localStorage.getItem("todoList"));
};

const AddTodoListLocalStorage = (data) => {
  return localStorage.setItem("todoList", JSON.stringify(data));
};

localTodoLists = getTodoListFromLocal() || [];

const addTodoDynamicElement = (element) => {
  const divElement = document.createElement("div");
  divElement.classList.add("main_todo_div");
  divElement.innerHTML = `<li>${element}</li>  <button class="deleteBtn">Delete</button>`;
  mainTodoElem.append(divElement);
};

const addTodoList = (event) => {
  event.preventDefault();
  console.log(inputValue.value.trim());
  const todoListValue = inputValue.value.trim();
  inputValue.value = "";
  if (todoListValue !== "" && !localTodoLists.includes(todoListValue)) {
    localTodoLists.push(todoListValue);
    localTodoLists = [...new Set(localTodoLists)];
    localStorage.setItem("todoList", JSON.stringify(localTodoLists));
  }

  addTodoDynamicElement(todoListValue);
};

const showTodoList = () => {
  localTodoLists.forEach((element) => {
    addTodoDynamicElement(element);
  });
};

showTodoList();

const removeTodoElem = (e) => {
  const TodoToRemove = e.target;
  let todoListContent = TodoToRemove.previousElementSibling.innerText;
  let parentElem = TodoToRemove.parentElement;

  localTodoLists = localTodoLists.filter((element) => {
    return element !== todoListContent.toLowerCase();
  });

  AddTodoListLocalStorage(localTodoLists);
  parentElem.remove()
  console.log(localTodoLists);
};

mainTodoElem.addEventListener("click", (e) => {
  e.preventDefault();
  console.log(e.target.classList.contains("deleteBtn"));
  if(e.target.classList.contains("deleteBtn")){
    removeTodoElem(e);
  }
});

document.querySelector(".btn").addEventListener("click", (e) => {
  addTodoList(e);
});
