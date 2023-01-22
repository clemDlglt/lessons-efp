// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
const modalOverlay = document.getElementById('modal-overlay');
const modal = document.getElementById('modal');
const editInput = document.getElementById('edit-input');
const editHidden = document.getElementById('edit-hidden');
const editForm = document.getElementById('edit-form');
const editCancelBtn = document.getElementById('edit-cancel');

// Event Listeners
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
editForm.addEventListener('submit', editTodo);
editCancelBtn.addEventListener('click', closeEditModal);

getTodos();

// Functions
function addTodo(event) {
    event.preventDefault();

    let id = 0;
    if (localLoad('lastId') !== null) {
        id = parseInt(localLoad('lastId')) + 1;
    }
    localSave('lastId', id);

    const todo = {
        id: id,
        content: todoInput.value,
        done: false,
    };

    saveLocalTodos(todo);
    displayTodo(todo);

    // Remplacer par displayTodo :
    // // TodoDIV
    // const todoDiv = document.createElement('div');
    // todoDiv.classList.add('todo');

    // // Create LI
    // const newTodo = document.createElement('li');
    // newTodo.innerText = todoInput.value;
    // newTodo.classList.add('todo-item');
    // todoDiv.appendChild(newTodo);

    // // CHECK MARK BUTTON ===> We can use both: .createElement() or innerHTML()
    // const completedButton = document.createElement('button');
    // completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    // completedButton.classList.add("completed-btn");
    // todoDiv.appendChild(completedButton);

    // // CHECK trash BUTTON ===> We can use both: .createElement() or innerHTML()
    // const trashButton = document.createElement('button');
    // trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    // trashButton.classList.add("trash-btn");
    // todoDiv.appendChild(trashButton);

    // //APPEND TO LIST
    // todoList.appendChild(todoDiv);

    //Clear TO DO INPUT VALUE
    todoInput.value = "";
}

function editTodo(event) {
    event.preventDefault();

    const todos = localLoad('todos');
    todos.find((todo) => todo.id === parseInt(editHidden.value))
    .content = editInput.value;
    localSave('todos', todos);

    reloadTodoList();
    closeEditModal();
}

function deleteCheck(e) {
    const item = e.target;

    //DELETE TO DO
    //if you have class="a b c", then .classList[0] is "a", .classList[1] is "b", and .classList[2] is "c".
    // TODO Peut-etre utiliser l'id de l'élément plutôt que sa classe
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;

        removeTodoFromStorage(getTodoId(todo.id));
    
        todo.classList.add('fall');
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    //CHECK MARK
    if(item.classList[0] === 'completed-btn'){
        const todo = item.parentElement;

        changeStatusInStorage(getTodoId(todo.id));

        todo.classList.toggle('completed');
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    console.log({todos, todoList})
    todos.forEach(function (todo)
    {
        if (todo.classList === undefined)
        {
            return;
        }

        switch(e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains('completed')){
                   todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo){
    //CHECK -- DO I ALREADY HAVE THINGS HERE?
    let todos;
    if (localLoad('todos') === null) {
        todos = [];
    } else {
        todos = localLoad('todos');  
    }
    
    todos.push(todo);
    localSave('todos', todos);
}

function getTodos() {
    let todos;

    //CHECK -- DO I ALREADY HAVE THINGS HERE?
    if (localLoad('todos') === null) {
        todos = [];
    } else {
        todos = localLoad('todos')  ; 
    }
    
    todos.forEach(function (todo) {
        displayTodo(todo);
        // // TodoDIV
        // const todoDiv = document.createElement('div');
        // todoDiv.classList.add('todo');

        // // Create LI
        // const newTodo = document.createElement('li');
        // newTodo.innerText = todoInput.value;
        // newTodo.classList.add('todo-item');
        // todoDiv.appendChild(newTodo);
        
        // // CHECK MARK BUTTON ===> We can use both: .createElement() or innerHTML()
        // const completedButton = document.createElement('button');
        // completedButton.innerHTML = '<i class="fas fa-check"> </i>';
        // completedButton.classList.add("completed-btn");
        // todoDiv.appendChild(completedButton);
        
        // // CHECK trash BUTTON ===> We can use both: .createElement() or innerHTML()
        // const trashButton = document.createElement('button');
        // trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
        // trashButton.classList.add("trash-btn");
        // todoDiv.appendChild(trashButton);
        
        // //APPEND TO LIST
        // todoList.appendChild(todoDiv);

        // // Pas nécessaire vu que la fonction boucle sur le localStorage
        // //ADD TODO TO LOCAL STORAGE
        // // saveLocalTodos(todoInput.value);
    });
}

// Fonction générique pour afficher les tâches :
function displayTodo(todo) {
    const todoDiv = document.createElement('div');

    todoDiv.classList.add('todo');
    if (todo.done) todoDiv.classList.add('completed');
      
    todoDiv.setAttribute('id', 'todo-' + todo.id);

    // Create LI
    // const newTodo = document.createElement('li');
    // newTodo.innerText = todo;
    // newTodo.classList.add('todo-item');
    // todoDiv.appendChild(newTodo);
    const newTodo = createElement({
        tag: 'li',
        content: todo.content,
        id: 'todo-' + todo.id,
        classes: ['todo-item'],
        parent: todoDiv,
    }).addEventListener('click', (event) => {
        const editedTodo = {
            id: getTodoId(event.srcElement.parentElement.id),
            content: event.srcElement.textContent,
        };
        openEditModal(editedTodo);
    });

    
    // CHECK MARK BUTTON ===> We can use both: .createElement() or innerHTML()
    // const completedButton = document.createElement('button');
    // completedButton.innerHTML = '<i class="fas fa-check"> </i>';
    // completedButton.classList.add("completed-btn");
    // todoDiv.appendChild(completedButton);
    const completedButton = createElement({
        tag: 'button',
        content: '<i class="fas fa-check"> </i>',
        classes: ['completed-btn'],
        parent: todoDiv,
    });
    
    // CHECK trash BUTTON ===> We can use both: .createElement() or innerHTML()
    // const trashButton = document.createElement('button');
    // trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
    // trashButton.classList.add("trash-btn");
    // todoDiv.appendChild(trashButton);
    const trashButton = createElement({
        tag: 'button',
        content: '<i class="fas fa-trash"> </i>',
        classes: ['trash-btn'],
        parent: todoDiv,
    });
    
    //APPEND TO LIST
    todoList.appendChild(todoDiv);
}

function reloadTodoList() {
    todoList.innerHTML = '';
    getTodos();
}

// Fonction générique pour générer du HTML :
function createElement({tag, content, classes = [], parent}) {
    const element = document.createElement(tag);
    element.innerHTML = content;
    classes.map(cssClass => element.classList.add(cssClass));
    parent.appendChild(element);

    return element;
}

function openEditModal(editedItem) {
    editInput.value = editedItem.content;
    editHidden.value = editedItem.id;
    modalOverlay.classList.add('display');
}

function closeEditModal() {
    modalOverlay.classList.remove('display');
}

function getTodoId(elementId) {
    return parseInt(elementId.split('-')[1]);
}

// Local storage related functions :

function localLoad(key) {
    return JSON.parse(localStorage.getItem(key));
}

function localSave(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeTodoFromStorage(id) {
    todos = localLoad('todos');
    todos.splice(todos.findIndex(todo => todo.id === id), 1);
    localSave('todos', todos);
}

function changeStatusInStorage(id) {
    todos = localLoad('todos');
    const selectedTodo = todos.find(todo => todo.id === id);
    selectedTodo.done = !selectedTodo.done;
    localSave('todos', todos);
}