//* Importing CSS
import "./styles/style.css";
import "./styles/header.css";
import "./styles/aside.css";
import "./styles/content.css";

//* Importing JS-Logic
import { Project } from "./js/logic/task.js";
import { CreateTodo } from "./js/logic/createToDo.js";
import DeleteTodo from "./js/logic/deleteToDo.js";
import { ChangeToDo, ChangeTaskCheckList } from "./js/logic/changeToDo.js";
import {
	updateLocalStorage,
	getLocalSTorage,
	deleteLocalStorage,
} from "./js/logic/saveToDoInLocalStorage.js";
import { ToDoSorter } from "./js/logic/ToDoFilter.js";
//* Importing JS-DOM
import {
	AddTask as changeSiteToAddTask,
	SearchTask as changeSiteSearchTask,
} from "./js/DOM/changeSite.js";
import { createNewTaskUILogic } from "./js/DOM/createNewTask.js";
import { EditTask } from "./js/DOM/editTask.js";
import { set } from "date-fns/set";

const addTaskInstance = new changeSiteToAddTask();
const searchTaskInstance = new changeSiteSearchTask();
const creatNewTask = new createNewTaskUILogic();
const editTask = new EditTask();
const toDoSorter = new ToDoSorter();

export const allToDosArray = [];
export const allProjectsArray = [];

function changeSite() {
	const bodyElement = document.body;
	bodyElement.addEventListener("click", (element) => {
		const clickedElement = element.target;
		console.log(clickedElement);

		switch (clickedElement.id) {
			case "addTask":
				if (localStorage.length === 0) { 
					console.info("No LocalStorage found!");
				} else { 
					getLocalSTorage();
				}
				console.log("Add Task Button clicked!");
				addTaskInstance.buildSite();

				//setTimeout to wait for the site to be build
				setTimeout(() => {
					const submitButton = document.querySelector("#submitTask");
					if (!submitButton) {
						console.error("No submit Button found!");
						return;
					}
					submitButton.addEventListener(
						"click",
						(event) => {
							event.preventDefault();
							console.log("Submit Button clicked!");
							creatNewTask.proccess();
							const formValue = creatNewTask.getExportValue();

							if (!formValue) {
								console.error("No form value found!" + formValue);
								return;
							}
							console.info("Form Value: ", formValue);
							settingAddTask(formValue);
							updateLocalStorage();
						},
						{ once: true }
						
					);
					
				}, 100);
				
				break;

			case "searchTask":
				getLocalSTorage();
				searchTaskInstance.buildSite(allToDosArray, true);
				setTimeout(() => {
					editTask.proccess();
					setTimeout(() => {
						editTask.sendProccess();
					}, 100);
					
				}, 100);
				break;
			
			case "dueTodayTask":
				getLocalSTorage();
				const today = toDoSorter.todaySorter(allToDosArray);
				console.log("Today: ", today);
				searchTaskInstance.buildSite(today, false);
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

function settingAddTask(task) {
	let addTask = new CreateTodo();
	addTask.processToDo(task);
	console.log("Check, if a task got into the array: ", allToDosArray);
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
console.log("Check, if a task got into the array: " + allToDosArray);
