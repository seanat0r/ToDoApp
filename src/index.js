// Importing CSS
import "./styles/style.css";
import "./styles/header.css";
import "./styles/aside.css";
import "./styles/content.css";

// Importing JS-Logic
import { Project } from "./js/logic/task.js";
import { CreateTodo } from "./js/logic/createToDo.js";
import DeleteTodo from "./js/logic/deleteToDo.js";
import { ChangeToDo, ChangeTaskCheckList } from "./js/logic/changeToDo.js";
import {
	updateLocalStorage,
	getLocalSTorage,
	deleteLocalStorage,
} from "./js/logic/saveToDoInLocalStorage.js";
// Importing JS-DOM
import { AddTask as changeSiteToAddTask } from "./js/DOM/changeSite.js";

const addTaskInstance = new changeSiteToAddTask();

export const allToDosArray = [];
export const allProjectsArray = [];

function changeSite() {
	const bodyElement = document.body;
	bodyElement.addEventListener("click", (element) => {
		const clickedElement = element.target; 
		console.log(clickedElement); 

		switch (clickedElement.id) {
			case "addTask":
				console.log("Add Task Button clicked!");
				addTaskInstance.buildSite();
				break;

			default:
				console.log("No Btn clicked");
				break;
		}
	});
}

function createNewProjects(name) {
	let newProjects = new Project(name);
	allProjectsArray.push(newProjects);
}
function addTaskToProjects(WhichProject, ...task) {}

function settingAddTask() {
	let addTask = new CreateTodo();
	//addTask.processToDo();
	addTask.createTodo(
		"Task 1",
		"Description 1",
		"2021-10-01",
		"green",
		"Notes 1",
		false
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
function settingChangeCompletedTask() {
	let completedTask = new ChangeTaskCheckList();
	completedTask.processTaskCheckList();
}

changeSite();

//settingAddTask();
//settingChangeCompletedTask();
//settingChangeTask();
//settingDeleteTask();
console.log(allToDosArray);
