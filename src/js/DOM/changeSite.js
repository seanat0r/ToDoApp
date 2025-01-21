const parentContent = document.getElementsByClassName("content");
const content = document.querySelector("#content");
class AddTask {
	formInput() {
        const form = document.querySelector("#form"); 

		for (let i = 0; i > 7; i++) {
			const createInput = document.createElement("input");
			createInput.id(`inputNumber${i}`);

			const createLabel = document.createElement("label");
			createLabel.id(`labelNumber${i}`);

			if (i === 1) {
				// TEXTFIELD -- i = 1, 3, 6, 7
                // --TITLE
				createInput.type = "text";
				createInput.textContent = "Textfield";

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Name the title of yout To Do: `;

                form.appendChild(createLabel);
                form.appendChild(createInput);
			} else if (i === 3) {
                // --DESCRIPTION
                createInput.type = "text";
				createInput.textContent = "Textfield";

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Description: `;

                form.appendChild(createLabel);
                form.appendChild(createInput);
			} else if (i === 6) {
                // --NOTES
                createInput.type = "text";
				createInput.textContent = "Textfield";

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Notes: `;

                form.appendChild(createLabel);
                form.appendChild(createInput);
			} else if (i === 7) {
                // --PROJECTS
                createInput.type = "text";
				createInput.textContent = "Textfield";

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `In which projects do you wanna add it? (write the name of it. If it's a new name, it will create a new Projects!)`;

                form.appendChild(createLabel);
                form.appendChild(createInput);
			} else if (i === 2) {
				// DATE
				createInput.type = "date";
				createInput.textContent = "Date";

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `When is the due date?`;

                form.appendChild(createLabel);
                form.appendChild(createInput);
			} else if (i === 4) {
				// RADIO -- priority
				createInput.type = "radio";
				createInput.textContent = "Green";

                const option2Input = document.createElement("input");
                const option3Input = document.createElement("input");

                option2Input.id = `input${i}Option2`;
                option3Input.id = `input${i}Option3`;

                option2Input.type = "radio";
                option3Input.type = "radio";

                option2Input.textContent = "Yellow";
                option3Input.textContent = "Red";

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Which priority does it have?`;

                form.appendChild(createLabel);
                form.appendChild(createInput);
                form.appendChild(option2Input);
                form.appendChild(option3Input);

			} else if (i === 5) {
				// RADIO -- Y/N
				createInput.type = "radio";
				createInput.textContent = "Yes";

                const optionNo = document.createElement("input");
                optionNo.id = `input${i}OptionNo`;
                optionNo.type = "radio";
                optionNo.textContent = "No"

				createLabel.htmlFor = `inputNumber${i}`;
				createLabel.textContent = `Already done?`;
			}
		}
	}
	createForm() {
		const createFormElement = document.createElement("form");
		createFormElement.id("form");
		content.appendChild(createFormElement);
	}

	buildSite() {
		this.createForm();
	}
}
