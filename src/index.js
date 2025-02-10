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
import { AddTask as changeSiteToAddTask, SearchTask as changeSiteSearchTask } from "./js/DOM/changeSite.js";
import {createNewTaskUILogic } from "./js/DOM/createNewTask.js"

const addTaskInstance = new changeSiteToAddTask();
const searchTaskInstance = new changeSiteSearchTask();
const creatNewTask = new createNewTaskUILogic();

export const allToDosArray = [];
export const allProjectsArray = [];

function changeSite() {
	const bodyElement = document.body;
	bodyElement.addEventListener("click", (element) => {
		const clickedElement = element.target;
		console.log(clickedElement);

		switch (clickedElement.id) {

			//TODO: REWRITE THE CODE! -> case: "addTask"
			case "addTask":
				console.log("Add Task Button clicked!");
				addTaskInstance.buildSite();

				// Warte auf den Submit-Klick
				setTimeout(() => {
					const submitButton = document.querySelector("#submitTask");
					if (!submitButton) {
						console.error("Submit-Button nicht gefunden!");
						return;
					}

					submitButton.addEventListener("click", (event) => {
						event.preventDefault(); // Verhindert das Neuladen der Seite
						console.log("Submit button clicked!");

						creatNewTask.proccess(); // Jetzt wird das Formular verarbeitet
						const formValue = creatNewTask.getExportValue();

						if (!formValue) {
							console.error("Error: formValue is null!");
							return;
						}

						console.info("Form Value:", formValue);
						settingAddTask(formValue);
					}, { once: true }); // Event-Listener nur einmal hinzufügen
				}, 100); // Kurze Verzögerung, um sicherzustellen, dass die Seite geladen ist
				
				break;
				case "searchTask":
					searchTaskInstance.buildSite();
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
