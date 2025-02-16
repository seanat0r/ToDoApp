import { set } from "date-fns/set";
import { allToDosArray } from "../../index.js";
import DeleteTodo from "../logic/deleteToDo.js";
import {
	updateLocalStorage,
	getLocalSTorage,
	deleteLocalStorage,
} from "../logic/saveToDoInLocalStorage.js";

export class EditTask {
	#isInEditorMode = false;
	#selectTask() {
		return new Promise((resolve) => {
			const content = document.querySelector("#Content");
			function getTaskIndex(element) {
				const clickedElement = element.target;
				const idElement = clickedElement.id;
				const parentElement = clickedElement.closest("h3");
				console.log("parentElement: ", parentElement);

				//check if the clicked element is the search field or button
				if (idElement === "searchField" || idElement === "searchButton") {
					return;
					//checks if the clicked element has no id, when so it checks if the parent element has an id
				} else if (!idElement && parentElement?.id) {
					console.info(
						"clicked Element has no id, but parent has id; Parent ID: " +
							parentElement.id
					);
					resolve(parentElement.id);
				}
				console.log("Clicked Element: ", idElement);
				resolve(idElement);
			}
			content.addEventListener("click", getTaskIndex);
		});
	}
	#buildEditorTask(taskTitle) {
		function createForm() {
			const createFormElement = document.createElement("form");
			createFormElement.id = "form";
			content.appendChild(createFormElement);
		}
		function formInput() {
			const task =
				allToDosArray.find((todo) => todo.taskTitle === taskTitle) || {};

			for (let i = 0; i < 10; i++) {
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
					createInput.value = task.taskTitle || "";

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
					textArea.value = task.taskDescription || "";

					form.appendChild(createLabel);
					form.appendChild(secondBrElement);
					form.appendChild(textArea);
					form.appendChild(brElement);

					textArea.placeholder = "Describe your task (optional)";
				} else if (i === 6) {
					// TEXTAREA -- NOTES
					const textArea = document.createElement("textarea");
					textArea.id = `inputNumber${i}`;
					createLabel.htmlFor = `inputNumber${i}`;
					createLabel.textContent = `Notes: `;
					textArea.value = task.taskNotes || "";

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
					createInput.value = task.projectName || "";

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
					createInput.value = task.taskDueDate
						? task.taskDueDate.split("T")[0]
						: "";

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

						if (
							task.taskPriority &&
							task.taskPriority.toLowerCase() === priority.toLowerCase()
						) {
							priorityInput.checked = true;
						}

						form.appendChild(priorityInput);
						form.appendChild(priorityLabel);
						form.appendChild(brElement);
					});
				} else if (i === 5) {
					// RADIO -- YES/NO (Done)
					createLabel.textContent = `Already done?`;
					form.appendChild(createLabel);

					const options = ["Yes", "No"];
					options.forEach((option, index) => {
						const optionInput = document.createElement("input");
						const optionLabel = document.createElement("label");

						optionInput.type = "radio";
						optionInput.name = "done";
						optionInput.id = `done${index}`;
						optionLabel.htmlFor = `done${index}`;
						optionLabel.textContent = option;

						if (
							task.taskChecklist !== null &&
							((task.taskChecklist === true && option === "Yes") ||
								(task.taskChecklist === false && option === "No"))
						) {
							optionInput.checked = true;
						}

						form.appendChild(optionInput);
						form.appendChild(optionLabel);
						form.appendChild(brElement);
					});
				} else if (i === 8) {
					// BUTTON -- SUBMIT
					const button = document.createElement("button");
					button.type = "submit";
					button.id = "submitEditTask";
					button.textContent = "Edit Task";

					form.appendChild(button);
				} else if (i === 9) {
					//BUTTON -- DELETE
					const button = document.createElement("button");
					button.type = "button";
					button.id = "deleteTask";
					button.textContent = "Delete Task";

					form.appendChild(button);
				}
			}
		}

		const content = document.querySelector("#Content");
		document.querySelector("#Content").innerHTML = "";
		createForm();
		formInput();
		this.#isInEditorMode = true;
	}

	async proccess() {
		console.log("Edit Task processed");
		const clickedElement = await this.#selectTask();
		console.log("ID Element in proccess: " + clickedElement);
		this.#buildEditorTask(clickedElement);
	}
	#delte() {
		const formTitle = document.querySelector("#inputNumber1").value;
		if (!formTitle) {
			console.info("No form title found!");
			return;
		}
		console.log("Task to delete: " + formTitle);
		let deleteTaskInstance;

		if (!deleteTaskInstance) {
			const deleteTaskInstance = new DeleteTodo();
			deleteTaskInstance.processDeleteToDo(formTitle);
			updateLocalStorage();
		} else {
			deleteTaskInstance.processDeleteToDo(formTitle);
			updateLocalStorage();
		}
	}
	#selectRadioValue(radio) {
		if (radio) {
			console.log("Priority: ", radio);
			const label = document.querySelector(`label[for="${radio.id}"]`);
			const forValue = label ? label.getAttribute("for") : null;
			console.log("ForValue: ", forValue);

			if (forValue === "priority0") {
				return "green";
			} else if (forValue === "priority1") {
				return "yellow";
			} else if (forValue === "priority2") {
				return "red";
			} else if (forValue === "done0") {
				return true;
			} else if (forValue === "done1") {
				return false;
			} else {
				return null;
			}
		}
	}
	#edit(element, task) {
		element.preventDefault();
		console.log(task.taskDescription);
		const titleValue = document.querySelector("#inputNumber1");
		const dueDateValue = document.querySelector("#inputNumber2");
		const descriptionValue = document.querySelector("#inputNumber3");
		const selectedPriority = [
			...document.querySelectorAll('input[name="priority"]'),
		].find((radio) => radio.checked);
		const selectedDone = [
			...document.querySelectorAll('input[name="done"]'),
		].find((radio) => radio.checked);
		const notesValue = document.querySelector("#inputNumber6");
		const projectValue = document.querySelector("#inputNumber7");
		console.log(selectedDone, selectedPriority);

		const taskName = allToDosArray.find((obj) => obj.taskTitle === task);
		console.log("TaskName: ", taskName);

		if (!taskName) {
			console.error("No task found!");
			return;
		}
		console.log("TaskChecklist: ", selectedDone);

		const selectedPriorityValue = this.#selectRadioValue(selectedPriority);
		console.log("priority Value: ", selectedPriorityValue);

		const selectedDoneValue = this.#selectRadioValue(selectedDone);
		console.log("Done Value: ", selectedDoneValue);

		titleValue
			? (taskName.taskTitle = titleValue.value)
			: console.error("No title found!");
		dueDateValue
			? (taskName.taskDueDate = dueDateValue.value)
			: (taskName.taskDueDate = null);
		descriptionValue
			? (taskName.taskDescription = descriptionValue.value)
			: (taskName.taskDescription = null);
		selectedPriority
			? (taskName.taskPriority = selectedPriorityValue)
			: (taskName.taskPriority = null);
		taskName.taskChecklist =
			typeof selectedDoneValue === "boolean" ? selectedDoneValue : null;
		notesValue
			? (taskName.taskNotes = notesValue.value)
			: (taskName.taskNotes = null);
		projectValue
			? (taskName.taskProjectName = projectValue.value)
			: (taskName.taskProjectName = null);
	}
	#click(task) {
		console.log("Click method is called!");
		const editButton = document.querySelector("#submitEditTask");
		const deleteButton = document.querySelector("#deleteTask");
		console.log(deleteButton);
		if (deleteButton) {
			console.log("Delete Button found!");
			deleteButton.addEventListener("click", () => this.#delte());
		}
		if (editButton) {
			console.log("Edit Button found!");
			editButton.addEventListener("click", (element) => {
				this.#edit(element, task);
				updateLocalStorage();
			});
		}
	}
	//TODO: Implement the edit function
	async sendProccess() {
		console.log("Edit Task SEND processed");

		const inetervalID = setInterval(() => {
			console.info("isInEditorMode: " + this.#isInEditorMode);
			if (this.#isInEditorMode) {
				const task = document.querySelector("#inputNumber1").value;
				this.#click(task);
			}
			if (this.#isInEditorMode) {
				this.#isInEditorMode = false;
				clearInterval(inetervalID);
			}
		}, 1500);
	}
}
