const textElement = document.getElementById('text');
const listElement = document.getElementById('new-list');
const endUlElement = document.getElementById('ended-list');
const timeout = [];
let index = 0;
let tasks = [];
window.addEventListener('storage', function(){
    listElement.innerHTML = "";
    if(localStorage.getItem("text")) {
        tasks = JSON.parse(localStorage.getItem("text"));
        tasks.forEach(task => addTask(task.text, task.id));
    }
});

if(localStorage.getItem("text")) {
    tasks = JSON.parse(localStorage.getItem("text"));
    tasks.forEach(task => addTask(task.text, task.id));
}


textElement.addEventListener('keypress', function (e){
    if (e.key === 'Enter' && textElement.value.trim() !== "") {
        tasks.push({id: index, text: textElement.value});
        localStorage.setItem("text", JSON.stringify(tasks));
        addTask(textElement.value);
    }
});

function addTask(text, id = null) {
        const task = document.createElement('li');
        const taskText = document.createElement('span');
        const checkboxElement = document.createElement('input');  
        checkboxElement.type = 'checkbox';
        checkboxElement.dataset.id = id ?? index++;
        listElement.appendChild(task);
        task.appendChild(checkboxElement);
        taskText.textContent = text;
        task.appendChild(taskText);
        textElement.value = "";
        checkboxElement.addEventListener('change',checkboxChangeHandler);
}

function checkboxChangeHandler(e){
    if(e.target.checked){
        timeout[+e.target.dataset.id] = setTimeout(function(){
            let element = e.target.parentElement;
            endUlElement.appendChild(e.target.parentElement);
            console.log("before", tasks, +e.target.dataset.id);
            tasks = tasks.filter(task => task.id !== +e.target.dataset.id);  
            console.log("after", tasks, +e.target.dataset.id);
            localStorage.setItem("text", JSON.stringify(tasks));
            e.target.remove();
            setTimeout(function(){
                element.remove();
            },4000)
        },2000);    
    }else{
        if(timeout[+e.target.dataset.id]) {
            clearTimeout(timeout[+e.target.dataset.id]);
            timeout[+e.target.dataset.id] = null;
        }
    }
    
    
}



    
