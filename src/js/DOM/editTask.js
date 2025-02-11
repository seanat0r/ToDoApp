import { allToDosArray } from "../../index.js";

export class EditTask {
	#selectTask() {
		return new Promise((resolve) => {
			const content = document.querySelector("#Content");
			function getTaskIndex(element) {
				const clickedElement = element.target;
				const idElement = clickedElement.id;
				console.log("Clicked Element: " + idElement);
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
			const task = allToDosArray.find((todo) => todo.taskTitle === taskTitle) || {};

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
					createInput.value = task.taskDueDate ? task.taskDueDate.split('T')[0] : "";

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

						if (task.taskPriority.toLowerCase() === priority.toLowerCase()) {
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
							(task.taskChecklist === true && option === "Yes") ||
							(task.taskChecklist === false && option === "No")
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
				}
			}
		}

		const content = document.querySelector("#Content");
		document.querySelector("#Content").innerHTML = "";
		createForm();
		formInput();
	}

	async proccess() {
		console.log("Edit Task processed");
		const clickedElement = await this.#selectTask();
		console.log("ID Element in proccess: " + clickedElement);
		this.#buildEditorTask(clickedElement);
	}
}
