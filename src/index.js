// Importing CSS
import "./styles/style.css";
import "./styles/header.css";
import "./styles/aside.css";
import "./styles/content.css";

// Importing JS
import { CreateTodo } from "./js/logic/todos.js";

export const allToDosArray = [];

function settingAddTask() {
	let addTask = new CreateTodo();
    addTask.processToDo();
}

settingAddTask();
console.log(allToDosArray);
