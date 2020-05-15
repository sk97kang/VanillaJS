const toDoForm = document.querySelector(".js-toDoForm");
const input = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");

let toDos = [];
let newId = 0;
const TODOS = "toDos";

function saveToDos() {
  localStorage.setItem(TODOS, JSON.stringify(toDos));
}

function submitToDo() {
  event.preventDefault();
  const currentValue = input.value;
  input.value = "";
  addToDo(currentValue);
}

function delToDo() {
  const target = event.target.parentNode;
  toDoList.removeChild(target);
  toDos = toDos.filter((toDo) => {
    return toDo.id !== Number(target.id);
  });
  saveToDos();
}

function addToDo(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const delBtn = document.createElement("button");
  const id = newId++;
  li.id = id;
  span.textContent = text;
  delBtn.innerText = "삭제";
  delBtn.addEventListener("click", delToDo);
  li.appendChild(delBtn);
  li.appendChild(span);
  toDoList.appendChild(li);
  const toDoObj = {
    id,
    text,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function loadToDos() {
  const loadedToDos = JSON.parse(localStorage.getItem(TODOS));
  if (loadedToDos !== null) {
    loadedToDos.forEach((toDo) => {
      addToDo(toDo.text);
    });
  }
}

function init() {
  toDoForm.addEventListener("submit", submitToDo);
  loadToDos();
}

init();
