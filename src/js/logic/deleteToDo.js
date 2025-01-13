import { allToDosArray } from "../../index.js";
export default class DeleteTodo {
	#allTaskToDelete = [];

	#whichTaskToDelete /*Input*/() {
		let taskName = prompt(
			"Deleting Task: Enter the index of the task you want to delete"
		); //placeholder for input
		this.#allTaskToDelete.push(taskName);
        console.log("Task to delete: " + this.#allTaskToDelete);
	}

	#deleteTask() {
		this.#allTaskToDelete.forEach((element) => {
			let taskIndex = this.#findTaskIndex(element);
			if (taskIndex !== -1) {
				this.#removeTask(taskIndex);
			}
		});
	}

	#findTaskIndex(title) {
		return allToDosArray.findIndex((task) => task.taskTitle === title);
	}

	#removeTask(index) {
		allToDosArray.splice(index, 1);
	}

	#checkUser() {
		if (confirm("Are you sure you want to delete?")) {
			return true;
		} else {
			return false;
		}
	}
	processDeleteToDo(/*input*/) {
		this.#whichTaskToDelete(/*input*/);
		if (this.#checkUser()) {
			console.log(
				"Task deletion confirmed! Deleting task: " + this.#allTaskToDelete
			);
			this.#deleteTask();
		} else {
			alert("Task deletion cancelled!");
			console.log("Task deletion cancelled");
		}
	}
}
