import fnDate from "date-fns";
import { createTaskObj } from './task.js';
import { allToDosArray as taskArray } from '../index.js';


export class createTodo {

    #validateToDoInput(title, description, dueDate, priority, notes, checklist) {
        if (typeof(checklist) !== 'boolean' || checklist === null) {
            console.log("Checklist must be a boolean");
            return false;
        }
        if (!priority === "green" || !priority === "yellow" || !priority === "red" || priority === null) {
            console.log("Priority must be green, yellow, or red");
            return false;
        }
        if ((typeof(notes) !== 'string' && typeof(description) !== 'string' && typeof(title) !== 'string') || notes === null) {
            console.log("Notes, description and string must be a string: " + typeof(notes) + ", " + typeof(description) + ", " + typeof(title));
            return false;
        }
        if (!fnDate.isValid(new Date(dueDate)) || dueDate === null) {
            console.log("Due date must be a valid date");
            return false;
        }
        return true;
    }
    #createTodo(title, description, dueDate, priority, notes, checklist) {
        let task = new createTaskObj(title, description, dueDate, priority, notes, checklist); // create a new task object
        console.log(task.title + "successfully created");
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
        let dueDateValue = prompt("Enter the due date of the task"); //placeholder for input
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
        let checklistValue = prompt("Enter the checklist of the task"); //placeholder for input
        return checklistValue;
    }
    processToDo() {
        let title = this.#setValueTitle();
        let description = this.#setDescriptionValue();
        let dueDate = this.#setDueDateValue();
        let priority = this.#setPriorityValue();
        let notes = this.#setNotesValue();
        let checklist = this.#setChecklistValue();

        if (this.#validateToDoInput(title, description, dueDate, priority, notes, checklist)) {
            this.#createTodo(title, description, dueDate, priority, notes, checklist);
        } else {
            console.log("Error in input");
        }

       
    }

}