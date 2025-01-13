// Importing CSS
import "./styles/style.css";
import "./styles/header.css";
import "./styles/aside.css";
import "./styles/content.css";

// Importing JS
import { CreateTodo } from "./js/logic/createToDo.js";
import DeleteTodo from "./js/logic/deleteToDo.js";

export const allToDosArray = [];

function settingAddTask() {
	let addTask = new CreateTodo();
	addTask.processToDo();
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

settingAddTask();

settingDeleteTask();
console.log(allToDosArray);
