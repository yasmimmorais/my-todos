//Selectors
const todoInput    = document.querySelector('.todo-input');
const todoButton   = document.querySelector('.todo-button');
const todoList     = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
window.addEventListener('DOMContentLoaded', getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

//Functions
function addTodo(event){
  //Prevent form from submitting
  event.preventDefault();
  //Todo Div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add("todo");
  //Todo Li
  const newTodo = document.createElement('li');
  newTodo.classList.add("todo-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  // Add to localStorage
  saveLocalTodos(todoInput.value);

  //Check button
  const completeBtn = document.createElement('button');
  completeBtn.classList.add("complete-btn");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';
  todoDiv.appendChild(completeBtn);
  //Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
  todoDiv.appendChild(deleteBtn);
  //Append to the Ul
  todoList.appendChild(todoDiv);
  todoInput.value = " ";
}

function deleteCheck(event){
  const item = event.target;

  if(item.classList.value === 'delete-btn'){
    const todo = item.parentElement;
    todo.classList.add("fall");
    deleteLocalTodos(todo);
    //Event that checks if the transition is finish
    todo.addEventListener('transitionend', function(){
      todo.remove();

    })
    // item.parentNode.remove(); *Another way
  }

  if (item.classList.value === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (event.target.value) {
      case "all":
          todo.style.display = 'flex';
        break;
      case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case "uncompleted":
        if(!todo.classList.contains('completed')){
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      default:
    }
  })
}

function saveLocalTodos(todo){
  //Check local storage to check if there are todoList
  let todos;

  if(localStorage.getItem('todos')===null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));

}

function getLocalTodos(todo){
  //Check local storage to check if there are todoList
  let todos;

  if(localStorage.getItem('todos')===null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //Todo Li
    const newTodo = document.createElement('li');
    newTodo.classList.add("todo-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);
    //Check button
    const completeBtn = document.createElement('button');
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completeBtn);
    //Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add("delete-btn");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(deleteBtn);
    //Append to the Ul
    todoList.appendChild(todoDiv);
  })
}

function deleteLocalTodos(todo){
  let todos;

  if(localStorage.getItem('todos')===null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const itemIndex = todo.children[0].innerText;

  //Array splice:
  // first argument finds the value
  //second argument how many of the value you want to remove

  todos.splice(todos.indexOf(itemIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));

}