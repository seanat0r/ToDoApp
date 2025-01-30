export class createNewTaskUILogic {
	constructor() {
		this.clickedElement = null;
		document
			.querySelector("#Content")
			.addEventListener("click", this.#handleClick.bind(this));
	}
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
				formatedValue.push(null);
			}
			formatedValue.push(input.value);
		}
		function getRadioValue(input) {
			input.forEach((radio) => {
                if (radio.checked) {
                    formatedValue.push(radio);
                }
            });
		}
        function getNewDate(input) {
            const newDate = new Date(input.value);
            formatedValue.push(newDate);
        }

        //formated and push to array
		getValue(titleValue);
		getValue(descriptionValue);
		getNewDate(dueDateValue)
		getRadioValue(priorityRadios);
		getValue(notesValue);
		getRadioValue(doneRadio);
		getValue(projectValue);

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
				isValid.push(dueDate && dueDate >= today ? true : false);
			}

			//only gives false when the use inputs only space!
			function validTextOrTextarea(textSelector) {
				if (textSelector.value) {
					isValid.push(textSelector.value.trim() !== "" ? true : false);
				} else {
					isValid.push(true);
				}
			}

			function validRadio(radioSelector) {
				let checked = false;
				radioSelector.forEach((radio) => {
					if (radio.checked) {
						checked = true;
					}
				});
				isValid.push(checked ? true : false);
			}

			validTitle();
			validDueDate();
			validTextOrTextarea(descriptionValue);
			validRadio(priorityRadios);
			validRadio(doneRadio);
			validTextOrTextarea(notesValue);
			validTextOrTextarea(projectValue);

			const isTrue = (currentValue) => currentValue === true;

			return isValid.every(isTrue);
		}
		//ensure that the form exist
		if (this.clickedElement.id !== "submitTask") {
			return console.log("Submit wasn't clicked!");
		}

		if (!validateForm()) {
			console.error("Invaild input in the form. change your input!");
			this.clickedElement.preventDefault();
			return;
		}

		this.clickedElement.preventDefault();
         const readyToSend = this.#formating();
        this.#exportData(readyToSend);
	}
    #exportData(value) {
        console.log("ToDo Value: " + value);
        this.#valueReadyToExport = value;
    }
    getExportValue() {
        return this.#valueReadyToExport;
    }

	proccess() {
		if (!this.#check()) {
			console.error("Form couldn't Load! No action can be made.");
			return;
		}
		this.#submitProccess();
	}

}
