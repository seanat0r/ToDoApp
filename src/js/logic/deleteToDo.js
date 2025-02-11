import { allToDosArray } from "../../index.js";
export default class DeleteTodo {
	#allTaskToDelete = [];

	#whichTaskToDelete(taskName) {
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
	processDeleteToDo(taskName) {
		this.#whichTaskToDelete(taskName);
		if (this.#checkUser()) {
			console.log(
				"Task deletion confirmed! Deleting task: " + this.#allTaskToDelete
			);
			this.#deleteTask();
			console.log("Task deletion successful!", allToDosArray);
		} else {
			console.warn("Task deletion cancelled!");
		}
	}
}
