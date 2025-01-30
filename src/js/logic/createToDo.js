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
		if (typeof checklist !== "boolean" && checklist === null) {
			console.error("Checklist must be a boolean");
			return false;
		}
		if (
			priority !== "green" &&
			priority !== "yellow" &&
			priority !== "red" &&
			priority !== null
		) {
			console.error("Priority must be green, yellow, or red");
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
			console.error(
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
		//checks first if it a valid date, after that it checks if it is not null
		if (!isValid(dueDate)) {
			let isNull = 0;
			if (dueDate === null) {
				isNull = 1;
			}
			if (isNull === 0) {
				console.error(
					"Due date must be a valid date. current value: " + dueDate
				);
				return false;
			}
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
	/*
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
		*/
	processToDo(formValue) {
		console.log("Processing ToDo");
		let title = formValue[0];
		let description = formValue[1];
		let dueDate = formValue[2];
		let priority = formValue[3];
		let notes = formValue[4];
		let checklist = formValue[5];
		let project = formValue[6];

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
