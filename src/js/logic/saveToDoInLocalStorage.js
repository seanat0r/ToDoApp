import { allToDosArray, allProjectsArray } from "../../index.js";

let keyToDo = "keyToDo";
let keyProjects = "keyProjects";

function saveToLocalStorage() {
	localStorage.setItem(keyToDo, JSON.stringify(allToDosArray) || []);
	localStorage.setItem(keyProjects, JSON.stringify(allProjectsArray) || []);
	console.info("LocalStorage updated!");
	console.info("allToDosArray: ", allToDosArray);
}

function clearLocalStorage() {
    localStorage.removeItem(keyToDo);
    localStorage.removeItem(keyProjects);
    console.info("LocalStorage cleard!");
    
    allToDosArray.length = 0;
    allProjectsArray.length = 0;
    console.info("All arrays cleared!");
}

function loadFromLocalStorage() {
	function saveToArray(save, which) {
		if (Array.isArray(save)) {
			which.length = 0;
			which.push(...save);
		} else {
			console.warn("No valid data found to load into the array.");
		}
	}
	let savedToDo = JSON.parse(localStorage.getItem(keyToDo) || []);
	let savedProjects = JSON.parse(localStorage.getItem(keyProjects) || []);

	saveToArray(savedToDo, allToDosArray);
    saveToArray(savedProjects, allProjectsArray);
}

export function updateLocalStorage() {
	console.info("User updated LocalStorage!");
    saveToLocalStorage();
}
export function getLocalSTorage() {
    loadFromLocalStorage();
}
export function deleteLocalStorage() {
    console.warn("User delted LocalStorage!")
    clearLocalStorage();
}

