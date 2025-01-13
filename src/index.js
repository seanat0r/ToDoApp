// Importing CSS
import "./styles/style.css";
import "./styles/header.css";
import "./styles/aside.css";
import "./styles/content.css";

// Importing JS
import { CreateTodo } from "./js/logic/createToDo.js";
import DeleteTodo from "./js/logic/deleteToDo.js";
import ChangeToDo from "./js/logic/changeToDo.js";

export const allToDosArray = [];

function settingAddTask() {
	let addTask = new CreateTodo();
	//addTask.processToDo();
    addTask.createTodo(
        "Task 1",
        "Description 1",
        "2021-10-01",
        "green",
        "Notes 1",
        true
    );
}
function settingDeleteTask() {
    let deleteTask = new DeleteTodo();
    deleteTask.processDeleteToDo();
}
function settingChangeTask() {
    let changeTask = new ChangeToDo();
    changeTask.processChangeToDo();
}

settingAddTask();
settingChangeTask();

//settingDeleteTask();
console.log(allToDosArray);
