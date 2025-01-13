import { allToDosArray } from "../../index.js";
import { isValid } from "../../../node_modules/date-fns/index.cjs";

export default class ChangeToDo {
	#indexChange = null;
	editableFields = [
		"taskTitle",
		"taskDescription",
		"taskDueDate",
		"taskPriority",
		"taskNotes",
		"taskChecklist",
	];

	#taskToChange() {
		return prompt("Enter the title of the task you want to change");
	}

	#findTaskIndex(taskTitle) {
		return allToDosArray.findIndex((task) => task.taskTitle === taskTitle);
	}
	#validateChangeInput() {
		let taskTitle = this.#taskToChange();
		let taskIndex = this.#findTaskIndex(taskTitle);
		if (taskIndex === -1) {
			console.log("Task not found");
			return false;
		}
		this.#indexChange = taskIndex;
		return true;
	}
	#valueTask(index) {
		let task = allToDosArray[index];
		return task;
	}
   #userInputChoice() {
        return prompt("Title: 1, Description: 2, Due Date: 3, Priority: 4, Notes: 5, Checklist: 6");
    }
    #validateUserInputChoice(value, selectedField) {
        const fieldValidators = {
            taskTitle: (value) => typeof value === "string" || value === null,
            taskDescription: (value) => typeof value === "string" || value === null,
            taskNotes: (value) => typeof value === "string" || value === null,
            taskPriority: (value) => ["red", "yellow", "green"].includes(value) || value === null,
            taskChecklist: (value) => typeof value === "boolean" || value === null,
            taskDueDate: (value) => isValid(value) || value === null,
          };
        const isValid = fieldValidators[selectedField]?.(value);
        if (isValid === undefined) {
            console.log("Invalid No validator function available for this field.");
        } else if (!isValid) {
            console.log("Invalid input");
        } else {
            console.log("Valid input");
            return isValid;
        }
    }
    #newValue(selectedField) {
        let value = prompt("Enter the new value");
        if (this.#validateUserInputChoice(value, selectedField)){
            return value;
        } else {
            console.log("Invalid input");
            return null;
        }
       
    }
	#chanegeInformation() {
		let task = this.#valueTask(this.#indexChange);
        let userInputChoice = this.#userInputChoice();
        const selectedField = this.editableFields[userInputChoice - 1];
        let newValue = this.#newValue(selectedField);
        task[selectedField] = newValue;
		
	}
	processChangeToDo() {
		this.#indexChange = null;
		if (!this.#validateChangeInput()) {
			return console.log("Task not found");
		}
        this.#chanegeInformation();
	}
}
