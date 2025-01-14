import { isValid } from "../../../node_modules/date-fns/index.cjs";
import { Task as createTaskObj, Project as CreateProjectObj } from "./task.js";
import { allToDosArray as taskArray } from "../../index.js";

export class CreateTodo {
	#validateToDoInput(
		title,
		description,
		dueDate,
		priority,
		notes,
		checklist,
		project
	) {
		if (typeof checklist !== "boolean" || checklist === null) {
			console.log("Checklist must be a boolean");
			return false;
		}
		if (
			priority !== "green" ||
			priority !== "yellow" ||
			priority !== "red" ||
			priority !== null
		) {
			console.log("Priority must be green, yellow, or red");
			return false;
		}
		if (
			(typeof notes !== "string" &&
				typeof description !== "string" &&
				typeof title !== "string" &&
				typeof project !== "string") ||
			notes === null ||
			description === null ||
			project === null
		) {
			console.log(
				"Notes, description and string must be a string: " +
					typeof notes +
					", " +
					typeof description +
					", " +
					typeof title +
					", " +
					typeof project
			);
			return false;
		}
		if (!isValid(dueDate) || dueDate === null) {
			console.log("Due date must be a valid date");
			return false;
		}
		return true;
	}
	createTodo(title, description, dueDate, priority, notes, checklist, project) {
		let task = new createTaskObj(
			title,
			description,
			dueDate,
			priority,
			notes,
			checklist,
			project
		);
		// create a new task object
		console.log(task.taskTitle + " successfully created");
		taskArray.push(task);
	}

	#setValueTitle() {
		let titleValue = prompt("Enter the title of the task"); //placeholder for input
		return titleValue;
	}
	#setDescriptionValue() {
		let descriptionValue = prompt("Enter the description of the task"); //placeholder for input
		return descriptionValue;
	}
	#setDueDateValue() {
		let dueDateValue = new Date(); //placeholder for input
		return dueDateValue;
	}
	#setPriorityValue() {
		let priorityValue = prompt("Enter the priority of the task"); //placeholder for input
		return priorityValue;
	}
	#setNotesValue() {
		let notesValue = prompt("Enter the notes of the task"); //placeholder for input
		return notesValue;
	}
	#setChecklistValue() {
		let checklistValue = false; //placeholder for input
		return checklistValue;
	}
	#setProjectValue() {
		let projectValue = prompt("Enter the Project of the task"); //placeholder for input
		return projectValue;
	}
	processToDo() {
		console.log("Processing ToDo");
		let title = this.#setValueTitle();
		let description = this.#setDescriptionValue();
		let dueDate = this.#setDueDateValue();
		let priority = this.#setPriorityValue();
		let notes = this.#setNotesValue();
		let checklist = this.#setChecklistValue();
		let project = this.#setProjectValue();

		if (
			this.#validateToDoInput(
				title,
				description,
				dueDate,
				priority,
				notes,
				checklist,
				project
			)
		) {
			this.createTodo(
				title,
				description,
				dueDate,
				priority,
				notes,
				checklist,
				project
			);
		} else {
			console.log("Error in input");
		}
	}
}


