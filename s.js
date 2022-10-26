const PKEY = "todo";
let todo = loadMe();
document.addEventListener("DOMContentLoaded", function () {
  readAgain();
  document.querySelector("#todofield").addEventListener("submit", addtodo);
  document.addEventListener("todochanges", todochanges);
});
function loadMe() {
  if (localStorage.getItem(PKEY) === null) {
    return [];
  } else {
    return JSON.parse(localStorage.getItem(PKEY));
  }
}
function saveMe() {
  //   localStorage.setItem(PKEY, JSON.stringify(PKEY));
  localStorage.setItem(PKEY, JSON.stringify(todo));
}
function addtodo(ev) {
  ev.preventDefault();
  const name = document.querySelector("#todo");
  if (name.value === "" || name.value.trim() === "") return; //popup(empty)
  const obj = objmaker(name.value);
  todo.push(obj);
  document.dispatchEvent(new Event("todochanges"));
  name.value = "";
}
function objmaker(name) {
  return { ip: generatenum(), name: name, isFinished: false };
}
function todochanges() {
  document.querySelector(".list").innerHTML = "";
  readAgain();
  saveMe();
  return;
}
function makerbox(a) {
  const contain = document.createElement("li");
  contain.classList.add("rounded", "rounded-2", "bg-white");
  const todos = document.createElement("span");
  if (a.isFinished === true) todos.classList.add("readed");
  todos.innerHTML = a.name;
  const wrap = document.createElement("div");
  wrap.classList.add("wrap");
  const read = document.createElement("span");
  read.classList.add("read", "rounded", "rounded-2");
  read.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg>`;
  read.addEventListener("click", function () {
    readthis(a);
  });
  const deleter = document.createElement("span");
  deleter.classList.add("delete", "rounded", "rounded-2");
  deleter.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>`;
  deleter.addEventListener("click", function () {
    deleteThis(a.ip);
  });
  wrap.append(read, deleter);
  contain.append(todos, wrap);
  document.querySelector(".list").append(contain);
}
function readthis(a) {
  a.isFinished === true ? (a.isFinished = false) : (a.isFinished = true);
  document.dispatchEvent(new Event("todochanges"));
}
function deleteThis(b) {
  todo.splice(
    todo
      .map((todo) => {
        return todo.ip;
      })
      .indexOf(b),
    1
  );
  document.dispatchEvent(new Event("todochanges"));
}
function readAgain() {
  document.querySelector(".list").innerHTML = "";
  for (let a of todo) {
    makerbox(a);
  }
}
function popup(event) {}
function generatenum() {
  return +new Date();
}
