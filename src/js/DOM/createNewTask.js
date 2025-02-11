export class createNewTaskUILogic {
	#handleClick(element) {
		this.clickedElement = element.target;
		console.log(
			"Inside Content (createNewTaskUILogic) clicked Element: " +
				this.clickedElement.id
		);
	}
	#valueReadyToExport = null;

	#check() {
		return document.querySelector("#form") ? true : false;
	}
	#formating() {
		const formatedValue = [];
		//Only need the value from it
		const titleValue = document.querySelector("#inputNumber1");
		const descriptionValue = document.querySelector("#inputNumber3");
		const notesValue = document.querySelector("#inputNumber6");
		const projectValue = document.querySelector("#inputNumber7");
		//check wich button got clicked
		const priorityRadios = document.querySelectorAll('input[name="priority"]');
		const doneRadio = document.querySelectorAll('input[name="done"]');
		//get a date value
		const dueDateValue = document.querySelector("#inputNumber2");

		function getValue(input) {
			if (!input.value) {
				formatedValue.push("");
			} else {
				formatedValue.push(input.value);
			}
		}
		function getRadioValue(input) {
			let selected = false;
			input.forEach((radio) => {
				if (radio.checked) {
					selected = true;
					if (radio.id === "done0") {
						formatedValue.push(true);
					} else if (radio.id === "done1") {
						formatedValue.push(false);
					} else if (radio.id === "priority0") {
						formatedValue.push("green");
					} else if (radio.id === "priority1") {
						formatedValue.push("yellow");
					} else if (radio.id === "priority2") {
						formatedValue.push("red");
					}
				}
				
			});
			if (!selected) {
				formatedValue.push(null);
			}
		}
		function getNewDate(input) {
			if (!input.value) {
				formatedValue.push(null);
			} else {
				const newDate = new Date(input.value);
				formatedValue.push(newDate);
			}
		}

		//formated and push to array
		//Index position
		getValue(titleValue); //0
		getValue(descriptionValue); //1
		getNewDate(dueDateValue); //2
		getRadioValue(priorityRadios); //3
		getValue(notesValue); //4
		getRadioValue(doneRadio); //5
		getValue(projectValue); //6

		return formatedValue;
	}
	#submitProccess() {
		function validateForm() {
			const isValid = [];
			const titleValue = document.querySelector("#inputNumber1");
			const dueDateValue = document.querySelector("#inputNumber2");
			const descriptionValue = document.querySelector("#inputNumber3");
			const priorityRadios = document.querySelectorAll(
				'input[name="priority"]'
			);
			const doneRadio = document.querySelectorAll('input[name="done"]');
			const notesValue = document.querySelector("#inputNumber6");
			const projectValue = document.querySelector("#inputNumber7");

			function validTitle() {
				isValid.push(titleValue.value.trim() !== "" ? true : false);
			}

			function validDueDate() {
				const today = new Date().toISOString().split("T")[0];
				const dueDate = dueDateValue.value;

				if (!dueDate) {
					isValid.push(true);
				} else {
					const parsedDate = new Date(dueDate);
					isValid.push(!isNaN(parsedDate) && dueDate >= today);
				}
			}

			//only gives false when the use inputs only space!
			function validTextOrTextarea(textSelector) {
				if (textSelector.value) {
					isValid.push(textSelector.value.trim() !== "" ? true : false);
				} else {
					isValid.push(true);
				}
			}

			function validRadio() {
				isValid.push(true);
			}

			validTitle(); //1
			validDueDate(); //2
			validTextOrTextarea(descriptionValue); //3
			validRadio(); //4
			validRadio(); //5
			validTextOrTextarea(notesValue); //6
			validTextOrTextarea(projectValue); //7

			console.log("Form validation: " + isValid);
			const isTrue = (currentValue) => currentValue === true;

			return isValid.every(isTrue);
		}
		
		if (validateForm()) {
			console.log("Form is valid, proceeding...");
		} else {
			console.error("Form validation failed!");
			return;
		}
		console.log("Form validation is done!");
		const readyToSend = this.#formating();
		this.#exportData(readyToSend);
	}
	#exportData(value) {
		console.dir("ToDo Value: " + value);
		this.#valueReadyToExport = value;
	}
	getExportValue() {
		return this.#valueReadyToExport;
	}

	proccess() {
		console.log("createNewTask is processing...");
		if (!this.#check()) {
			console.error("Form couldn't Load! No action can be made.");
			return;
		}
		this.#submitProccess();
	}
}
