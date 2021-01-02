let todos = [];

//checkCompleted
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

//fetch
const fetchData = () => {
    todos = [{ id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }]

    render();
}

document.addEventListener('DOMContentLoaded', fetchData);


//render
const $todoList = document.querySelector('.todos');

const render = givenTodos => {
    if (givenTodos !== undefined) {
        $todoList.innerHTML = givenTodos.map(({id, content, completed}) => {
            return `<li id="${id}" class="todo-item">
            <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
            <label for="ck-${id}">${content}</label>
            <i class="remove-todo far fa-times-circle"></i>
          </li> `
        }).join('');    
    } else {
        $todoList.innerHTML = todos.map(({id, content, completed}) => {
            return `<li id="${id}" class="todo-item">
            <input id="ck-${id}" class="checkbox" type="checkbox" ${completed ? 'checked' : ''}>
            <label for="ck-${id}">${content}</label>
            <i class="remove-todo far fa-times-circle"></i>
          </li> `
        }).join('');
    
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
//add
const $input = document.querySelector('.input-todo');
$input.onkeyup = e => {
    if (e.key !== 'Enter') return;
    addTodo($input.value);
}

const addTodo = content => {
    if(!content) return;
    const generateId = () => todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    todos = [...todos, {id: generateId(), content, completed: false}]
    showData();
    
    $input.value = '';
}

const updateCompleted = id => {
    todos = todos.map(todo => {
        if (todo.id === +id) todo.completed = !todo.completed;
        return todo;
    })
    showData();
}

// update check
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


//complete all button
const completedAllButton = document.querySelector('.complete-all');

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
const clearAllcompletedButton = document.querySelector('.clear-completed');
const clearAllcompleted = () => {
    todos = todos.filter(todo =>  !todo.completed);
    showData();
}
clearAllcompletedButton.onclick = e => {
    clearAllcompleted();
}

// active button
const $tapMenu = document.querySelector('.nav');

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

    }
    
    showData();
}
