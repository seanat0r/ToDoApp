import { sub } from "date-fns/sub";
import { allToDosArray, allProjectsArray } from "../../index.js";
import { ToDoSorter } from "../logic/ToDoFilter.js";
import { set } from "date-fns/set";
export class AddTask {
	formInput() {
		const form = document.querySelector("#form");

		for (let i = 0; i < 9; i++) {
			const brElement = document.createElement("br");
			const secondBrElement = document.createElement("br");

			const createInput = document.createElement("input");
			createInput.id = `inputNumber${i}`;

			const createLabel = document.createElement("label");
			createLabel.id = `labelNumber${i}`;

			if (i === 1) {
				// TEXTFIELD -- TITLE

				createInput.type = "text";
				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Name the title of your To Do: `;

				form.appendChild(createLabel);
				form.appendChild(secondBrElement);
				form.appendChild(createInput);
				form.appendChild(brElement);

				createInput.required = true;
				createInput.placeholder = "Give your Todo a title ...";
			} else if (i === 3) {
				// TEXTAREA -- DESCRIPTION
				const textArea = document.createElement("textarea");
				textArea.id = `inputNumber${i}`;

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Description: `;

				form.appendChild(createLabel);
				form.appendChild(secondBrElement);
				form.appendChild(textArea);
				form.appendChild(brElement);

				textArea.placeholder = "Describe your task (optinoal)";
			} else if (i === 6) {
				// TEXTFIELD -- NOTES
				const textArea = document.createElement("textarea");
				textArea.id = `inputNumber${i}`;

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Notes: `;

				form.appendChild(createLabel);
				form.appendChild(secondBrElement);
				form.appendChild(textArea);
				form.appendChild(brElement);

				textArea.placeholder =
					"Additional thoughts or important details (optional)…";
			} else if (i === 7) {
				// TEXTFIELD -- PROJECTS
				createInput.type = "text";
				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `In which project do you want to add it?`;

				form.appendChild(createLabel);
				form.appendChild(secondBrElement);
				form.appendChild(createInput);
				form.appendChild(brElement);

				createInput.placeholder =
					"Add to a project (same name) or create a new project.";
			} else if (i === 2) {
				// DATE
				createInput.type = "date";
				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `When is the due date?`;

				form.appendChild(createLabel);
				form.appendChild(secondBrElement);
				form.appendChild(createInput);
				form.appendChild(brElement);
			} else if (i === 4) {
				// RADIO -- PRIORITY
				createLabel.textContent = `Which priority does it have?`;
				form.appendChild(createLabel);
				form.appendChild(secondBrElement);

				const priorities = ["Green", "Yellow", "Red"];
				priorities.forEach((priority, index) => {
					const priorityInput = document.createElement("input");
					const priorityLabel = document.createElement("label");

					priorityInput.type = "radio";
					priorityInput.name = "priority";
					priorityInput.id = `priority${index}`;
					priorityLabel.htmlFor = `priority${index}`;
					priorityLabel.textContent = priority;

					form.appendChild(priorityInput);

					form.appendChild(priorityLabel);
					form.appendChild(brElement);
				});
			} else if (i === 5) {
				// RADIO -- YES/NO
				createLabel.textContent = `Already done?`;
				form.appendChild(createLabel);
				//form.appendChild(secondBrElement);

				const options = ["Yes", "No"];
				options.forEach((option, index) => {
					const optionInput = document.createElement("input");
					const optionLabel = document.createElement("label");

					optionInput.type = "radio";
					optionInput.name = "done";
					optionInput.id = `done${index}`;
					optionLabel.htmlFor = `done${index}`;
					optionLabel.textContent = option;

					form.appendChild(optionInput);
					form.appendChild(optionLabel);
					form.appendChild(brElement);
				});
			} else if (i === 8) {
				// BUTTON -- SUBMIT
				const button = document.createElement("button");
				button.type = "submit";
				button.id = "submitTask";
				button.textContent = "Add Task";

				form.appendChild(button);
			}
		}
	}

	createForm() {
		const content = document.querySelector("#Content");
		const createFormElement = document.createElement("form");
		createFormElement.id = "form";
		content.appendChild(createFormElement);
	}

	buildSite() {
		document.querySelector("#Content").innerHTML = "";

		this.createForm();
		this.formInput();
	}
}
export class SearchTask {
	#debounceTimer;
	#createLayerDiv(array) {
		//* To get the element: element.taskProjectName
		const createdProjects = new Set();

		array.forEach((element) => {
			const projectName = element.taskProjectName || "No Project";
			if (createdProjects.has(projectName)) {
				return;
			}

			const createH2 = document.createElement("h2");
			const content = document.querySelector("#Content");

			createH2.id = projectName;
			createH2.innerText = `Project: ${projectName}`;

			content.appendChild(createH2);
			createdProjects.add(projectName);

			console.info(`Layer 'layer${projectName}' created`);
			const elementLayer = document.getElementById(projectName);

			//Styling
			elementLayer.style.textAlign = "center";
			elementLayer.style.color = "white";
			elementLayer.style.borderBottom = "3px solid #000";
		});
	}

	#createTask(array) {
		array.forEach((element) => {
			const createH3 = document.createElement("h3");
			const taskName = element.taskTitle;
			const projectDiv = document.getElementById(
				`${element.taskProjectName || "No Project"}`
			);

			createH3.id = taskName;
			createH3.innerText = taskName;

			projectDiv.appendChild(createH3);

			this.#taskDetails(element, document.getElementById(taskName));
		});
	}
	#taskDetails(task, projectDiv) {
		let i = 1;
		//* Add styling to the text
		//Project name does not need to be displayed
		while (i < Object.keys(task).length - 1) {
			const createPWhat = document.createElement("p");
			const createPDetails = document.createElement("p");

			const taskDetails = task[Object.keys(task)[i]];

			createPWhat.innerText = `${Object.keys(task)[i]}:`;
			createPDetails.innerText = `${taskDetails}`;

			projectDiv.appendChild(createPWhat);
			projectDiv.appendChild(createPDetails);

			createPWhat.style.textAlign = "left";
			createPDetails.style.textAlign = "left";

			createPWhat.style.fontWeight = "bold";
			createPDetails.style.fontWeight = "normal";

			createPWhat.style.marginLeft = "10px";
			createPDetails.style.marginLeft = "10px";
			console.log(i);
			if (i === 3) {
				if (task.taskPriority === "red") {
					createPDetails.style.color = "red";
				} else if (task.taskPriority === "yellow") {
					createPDetails.style.color = "yellow";
				} else if (task.taskPriority === "green") {
					createPDetails.style.color = "green";
				}
			}
			if (i === 5) {
				console.log("Last Element + ", i);
				createPDetails.style.borderBottom = "3px dashed #000";
				createPDetails.style.marginBottom = "5px";
			}
			i++;
		}
	}
	#searchField() {
		//search field
		const searchField = document.createElement("input");
		searchField.id = "searchField";
		searchField.type = "text";
		searchField.placeholder = "Search for a Task";
		searchField.style.marginTop = "10px";
		searchField.style.marginBottom = "10px";
		searchField.style.width = "100%";
		searchField.style.height = "40px";
		//submit button
		const submitButton = document.createElement("button");
		submitButton.id = "submitSearch";
		submitButton.textContent = "Search";
		submitButton.type = "submit";
		submitButton.style.marginTop = "10px";
		submitButton.style.marginBottom = "10px";
		submitButton.style.width = "100%";
		submitButton.style.height = "40px";
		submitButton.style.border = "2px dotted #ffa200";
		submitButton.style.borderRadius = "9px 9px";

		document.querySelector("#Content").appendChild(searchField);
		document.querySelector("#Content").appendChild(submitButton);
	}
	#search(searchLogic) {
		const searchTerm = document.querySelector("#searchField");
		const submitSearch = document.querySelector("#submitSearch");

		const handleSearch = () => {
			clearTimeout(this.#debounceTimer);

			this.#debounceTimer = setTimeout(() => {
				const searchValue = searchTerm.value;
				const filteredResult = searchLogic.searchTask(searchValue);

				if (filteredResult.length > 0) {
					document.querySelector("#Content").innerHTML = "";
					this.#searchField();
					this.#search(searchLogic);
					this.#createLayerDiv(filteredResult);
					this.#createTask(filteredResult);
				} else {
					document.querySelector("#Content").innerHTML = "";
					this.#searchField();
					this.#search(searchLogic);
					this.#createLayerDiv(allToDosArray);
					this.#createTask(allToDosArray);
				}
			}, 1000);
		};
		searchTerm.addEventListener("input", handleSearch);
		submitSearch.addEventListener("click", handleSearch);
	}
	buildSite(whichArray, withSearch) {
		console.info("Search Task Button clicked!");
		console.log("Projects: ", allProjectsArray, "and Tasks:", whichArray);

		document.querySelector("#Content").innerHTML = "";
		const searchLogic = new ToDoSorter();
		if (withSearch) {
			this.#searchField();
		}
		this.#createLayerDiv(whichArray);
		this.#createTask(whichArray);
		if (withSearch) {
			this.#search(searchLogic);
		}
	}
}
