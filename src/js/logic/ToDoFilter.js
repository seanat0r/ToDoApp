import {
	isToday,
	addDays,
	isWithinInterval,
	startOfToday,
} from "../../../node_modules/date-fns/index.cjs";
import { allToDosArray } from "../../index.js";

export class ToDoSorter {
	//Allowed to manipulate the orginial array
	priorityColorSorter(array) {
		const priorityOrder = {
			red: 0,
			yellow: 1,
			green: 2,
		};
		array.sort((task1, task2) => {
			if (task1.taskPriority === null) return 1;
			if (task2.taskPriority === null) return -1;

			return (
				priorityOrder[task1.taskPriority] - priorityOrder[task2.taskPriority]
			);
		});
		return array;
	}

	//Not allowed to manipulate the orginial array Not
	todaySorter(array) {
		const today = array.filter((element) => {
			let taskDueDate = element.taskDueDate;
			if (!(taskDueDate instanceof Date)) {
				taskDueDate = new Date(taskDueDate);
			}
			return isToday(taskDueDate);
		});
		return this.priorityColorSorter(today);
	}

	//Not allowed to manipulate the orginial array Not
	upCommingSorter(array) {
		const startDay = startOfToday();
		const endDay = addDays(startDay, 7);
		const upComming = array.filter((element) => {
			let taskDay = element.taskDueDate;
			if (!(taskDay instanceof Date)) {
				taskDay = parseISO(taskDay);
			}
			return isWithinInterval(taskDay, { start: startDay, end: endDay });
		});
		//sort by date
		upComming.sort((task1, task2) => {
			let taskDueDate1 = task1.taskDueDate;
			let taskDueDate2 = task2.taskDueDate;

			if (taskDueDate1 < taskDueDate2) return -1;
			if (taskDueDate1 > taskDueDate2) return 1;

			//sort if same date with priority
			return this.priorityColorSorter([task1, task2])[0] === task1 ? -1 : 1;
		});

		return upComming;
	}
	//Looks for an element, that includes the exact same word or it contains following letters (search for "he" -> "hello" is true)
	#findElement(element, searchTerm) {
		return element.taskTitle.toLowerCase().includes(searchTerm.toLowerCase());
	}
	#searchToDosAndProjects(searchValue, searchInArray){
		return searchInArray.filter((element) => this.#findElement(element, searchValue));
	}

	searchTask(search) {
		console.info("Search for: ", search);
		let searchValue = search;
		if (typeof searchValue !== "string") {
			return console.log(
				"Invalid Searchvalue. SearchValue needs to be a string! Current type: " +
				typeof searchValue
			);
		}
		// Search for task (ToDos)
		const findValueToDo = this.#searchToDosAndProjects(searchValue, allToDosArray);
	
		// remove duplicates and return the value
		const allTaskFound = [...new Set(findValueToDo)];
	
		return allTaskFound;
	}
}
