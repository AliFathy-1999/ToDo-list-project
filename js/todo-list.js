let taskBody = document.getElementById("task-body");
let ulTasks = document.getElementById("ul-tasks");
let tasksInput= document.getElementById("tasksInput");
let saveTaskBtn = document.getElementById("save-task-btn"); 
let completedultasks = document.getElementById("completed-ul-tasks")
let tasks=[];
let completedtasks=[];
let taskStatus = document.getElementById("taskStatus");
let taskCompStatus = document.getElementById("taskCompStatus");
saveTaskBtn.addEventListener("click",AddTask);
function check() {
    if(tasks==false){
        let state = document.createElement("p");
        taskStatus.innerHTML=`<i class='fa-solid fa-circle-xmark'></i> No tasks added`
        taskStatus.append(state);
    }else{
        console.log("none");
        taskStatus.innerHTML=""
    }
}
function checkComplete() {
    if(completedtasks==false){
        let state = document.createElement("p");
        taskCompStatus.innerHTML=`<i class='fa-solid fa-circle-xmark'></i> No Completed tasks added`
        taskStatus.append(state);
    }else{
        taskCompStatus.innerHTML=""
    }
}
function AddTask(){
    if(tasksInput.value){
        let task = {
            id:Date.now().toString().slice(9,13),
            body:tasksInput.value,
        }
        tasks.push(task);
        saveInLocalStorage(tasks)
        
    }else {
        console.log("Enter value first");
    }
    tasksInput.value=''
}
// *******************************DisplayTask*********************************
function DisplayTask(task){
    ulTasks.innerHTML = '';
        task.forEach((task) => {

            let li= document.createElement("li");   
            li.innerHTML=`
            <li id="li-task-${task.id}" class="li-task-style">
                <h2 id="task-body" class="task-body-style">${task.body}</h2>
                <div id="tasks-buttons">
                    <button id="set-task-btn-${task.id}" onclick="completeTask(${task.id})" class="buttons-style"><i class="fa-solid fa-check"></i></button>
                    <button id="remove-task-btn-${task.id}" onclick="removeTask(${task.id})" class="buttons-style"><i class="fa-solid fa-trash"></i></button>
                </div>
            </li>
            `
            ulTasks.append(li);
        })
       
            

}
// *******************************saveInLocalStorage*********************************
function saveInLocalStorage(task){
    localStorage.setItem("tasks",JSON.stringify(task));
    check();
    DisplayTask(task);
}
// *******************************getTasks*********************************
function getTasks() {
    const tasksArr = localStorage.getItem('tasks');
    if (tasksArr) {
      tasks = JSON.parse(tasksArr);
      DisplayTask(tasks);
    }

}
getTasks();
check();
// *******************************completeTask*********************************
function completeTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        console.log(tasks[i]);
        if (tasks[i].id == id) {
            completedtasks.push(tasks[i]);
            tasks.shift(); 
            saveInLocalStorage(tasks)
        }        
    }
    saveCompInLocalStorage(completedtasks);
}
// *******************************removeTask*********************************
function removeTask(id) {
    for (let i = 0; i < tasks.length; i++) {
        if(tasks[i].id==id)
        {
            tasks.shift(); 
            saveInLocalStorage(tasks);
        }
    }
}
// *******************************DisplayCompleteTasks*********************************
function DisplayCompleteTasks(Ctask){
    completedultasks.innerHTML = '';
    Ctask.forEach((task)=> {
            let li= document.createElement("li");   
            li.innerHTML=`
            <li id="completed-li-task">
                <h2 id="completed-task-body-${task.id}" class="task-body-style">${task.body}</h2>
                <div id="completed-tasks-buttons-${task.id}">
                    <button id="completed-task-btn-${task.id}" onclick="addTaskAgain(${task.id})" class="buttons-style"><i class="fa-solid fa-check"></i></button>
                    <button id="remove-task-btn-${task.id}" onclick="removeCompTask(${task.id})"class="buttons-style"><i class="fa-solid fa-trash"></i></button>
                </div>
            </li>`
            completedultasks.append(li)
        });
}
// *******************************saveCompInLocalStorage*********************************
function saveCompInLocalStorage(Ctask) {
    localStorage.setItem("CompletedTasks",JSON.stringify(Ctask));
    checkComplete()
    DisplayCompleteTasks(Ctask);
}
// *******************************getCompleteTasks*********************************
function getCompleteTasks() {
    const CompletedtasksArr = localStorage.getItem('CompletedTasks');
    if (CompletedtasksArr) {
      completedtasks = JSON.parse(CompletedtasksArr);
      DisplayCompleteTasks(completedtasks);
    }
    saveCompInLocalStorage(completedtasks);
}
getCompleteTasks()
checkComplete()
//*******************************addTaskAgain*********************************
function addTaskAgain(id){
    for (let i = 0; i < completedtasks.length; i++) {
        if(completedtasks[i].id==id)
        {
           tasks.push(completedtasks[i]);
            completedtasks.shift();
            saveCompInLocalStorage(completedtasks);
            saveInLocalStorage(tasks) 
        }
    }
}
//*******************************removeCompTask*********************************
function removeCompTask(id){
    for (let i = 0; i < completedtasks.length; i++) {
        if(completedtasks[i].id==id)
        {
            completedtasks.shift(); 
            saveCompInLocalStorage(completedtasks);
        }
    }
}