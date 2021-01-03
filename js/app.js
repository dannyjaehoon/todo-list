let todos = [];

// DOM nodes
const $todoList = document.querySelector('.todos');
const $input = document.querySelector('.input-todo');
const completedAllButton = document.querySelector('.complete-all');
const clearAllcompletedButton = document.querySelector('.clear-completed');
const $tapMenu = document.querySelector('.nav');

//fetch
const fetchData = () => {
    todos = [{ id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }]

    //initial rendering
    render();
}

const createElement = todo => {

    const $liNode = document.createElement('li');
    $liNode.classList.add('todo-item');
    $liNode.id = todo.id;

    const $inputNode = document.createElement('input');
    $inputNode.classList.add('checkbox');
    $input.setAttribute('type', 'checkbox');
    $inputNode.id = `ck-${todo.id}`;
    if (todo.completed) $inputNode.setAttribute('checked', '');

    const $labelNode = document.createElement('label');
    $labelNode.setAttribute('for', `ck-${todo.id}`);
    $labelNode.textContent = todo.content;

    const $iconNode = document.createElement('i');
    $iconNode.classList.add('remove-todo');
    $iconNode.classList.add('fa-times-circle');
    $iconNode.classList.add('far');

    
    $liNode.appendChild($inputNode);
    $liNode.appendChild($labelNode);
    $liNode.appendChild($iconNode);

    return $liNode;
}

createElement({ id: 1, content: 'HTML', completed: true });

//render
const render = givenTodos => {
    const $fragment = document.createDocumentFragment();
    $todoList.innerHTML = '';

    if (givenTodos !== undefined) {
        givenTodos.forEach(todo => {
            $fragment.appendChild(createElement(todo));
        })
        $todoList.appendChild($fragment);
    } else {
        todos.forEach(todo => {
            $fragment.appendChild(createElement(todo));
        })
        $todoList.appendChild($fragment);
    }

    // console.log(completedAllButton.firstElementChild.checked = false);
    //check if all todo's completed are false or no data in the $todoList. 
    if (todos.length === 0 || checkCompleted()) completedAllButton.firstElementChild.checked = false;

    //show completed and active todos
    const numOfCompleted = todos.filter(todo => todo.completed).length;
    document.querySelector('.completed-todos').textContent = numOfCompleted;
    const numOfActive = todos.filter(todo => !todo.completed).length;
    document.querySelector('.active-todos').textContent = numOfActive;
}


//fetch data when loaded
document.addEventListener('DOMContentLoaded', fetchData);



//check All Completed are true
const checkCompleted = () => {
    return todos.every(todo => todo.completed === false)
}

//show only active todos
const showOnlyActive = () => {
    const activeTodos = todos.filter(todo => !todo.completed);
    render(activeTodos);
}

//show only completed todos
const showOnlyCompleted = () => {
    const completedTodos = todos.filter(todo => todo.completed);
    render(completedTodos);
}

// show different data on differet pages
const showData = () => {
    if (document.getElementById('active').classList.contains('active')) {
        showOnlyActive();
        return;    
    } 
    if (document.getElementById('completed').classList.contains('active')) {
        showOnlyCompleted();
        return;    
    } 
    render();
}

//add
const addTodo = content => {
    if(!content) return;
    const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    todos = [...todos, {id: generateId(), content, completed: false}]
    showData();
    
    $input.value = '';
}
$input.onkeyup = e => {
    if (e.key !== 'Enter') return;
    addTodo($input.value);
}


//update the completed status with id
const updateCompleted = id => {
    todos = todos.map(todo => {
        if (todo.id === +id) todo.completed = !todo.completed;
        return todo;
    })
    showData();
}
$todoList.onchange = e => {
    updateCompleted(e.target.parentNode.id);
}

//remove
const removeTodo = id => {
    todos =  todos.filter(todo => todo.id !== +id);
    showData();
}
$todoList.onclick = e => {
    if (!e.target.matches('.todos > li > i.remove-todo')) return;
    removeTodo(e.target.parentNode.id);
}


//toggle completed status when completeAllButton is clicked
const changeAllCompleted = e => {
    if(e.target.checked) {
        todos = todos.map(todo => {
            if(todo.completed === false) todo.completed = true;
            return todo;
        })
    } else {
        todos = todos.map(todo => {
            if(todo.completed === true) todo.completed = false;
            return todo;
        })
    }
    showData();
}
completedAllButton.onchange = e => {
    changeAllCompleted(e);
}

//clear all completed
const clearAllcompleted = () => {
    todos = todos.filter(todo =>  !todo.completed);
    showData();
}
clearAllcompletedButton.onclick = e => {
    clearAllcompleted();
}

// Tab menu - eventlistener
$tapMenu.onclick = e => {
    if(e.target.id === 'all') {
        e.target.classList.add('active');
        e.target.nextElementSibling.classList.remove('active');
        e.target.nextElementSibling.nextElementSibling.classList.remove('active');
    } else if (e.target.id == 'active') {
        e.target.classList.add('active');
        e.target.previousElementSibling.classList.remove('active');
        e.target.nextElementSibling.classList.remove('active');
    } else {
        e.target.classList.add('active');
        e.target.previousElementSibling.classList.remove('active');
        e.target.previousElementSibling.previousElementSibling.classList.remove('active');
        completedAllButton.firstElementChild.checked = true;
    }

    showData();
}

