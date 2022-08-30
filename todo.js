const toDoForm = document.getElementById("todo-form");
const toDoInput= toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");
const ul = document.querySelector("ul");
const TODOS_KEY = "todos";

let toDos = [];

function saveToDos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    const li = event.target.parentElement;
    li.remove();
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();
}

/*여기 수정!! 전체가 사라지면 안됨!!*/
function completeToDo(tomato){
    const li = tomato.target.parentElement;
    if(li.classList.contains("complete")){
        li.classList.remove("complete");
    } else{
        li.classList.add("complete");
    }
}

function paintToDo(newTodo){

    const li = document.createElement("li");
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text;
    const button = document.createElement("button");
    button.innerText = "X";
    button.addEventListener("click",deleteToDo);
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}


function handleToDoSubmit(event){
    event.preventDefault();
    const newTodo = toDoInput.value;
    toDoInput.value="";
    const newTodoObj = {
        text: newTodo,
        id: Date.now(),
    }
    toDos.push(newTodoObj);
    paintToDo(newTodoObj);
    saveToDos();
}
toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);

if(savedToDos !== null){
    const parsedToDos = JSON.parse(savedToDos);
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo);
}

/*
list.addEventListener("click", handleTitleClick);*/

ul.addEventListener("click",completeToDo);