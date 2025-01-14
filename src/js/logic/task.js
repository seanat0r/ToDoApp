export class Task {
	constructor(
		taskTitle,
		taskDescription,
		taskDueDate,
		taskPriority,
		notes,
		checklist,
		projectName
	) {
		this.taskTitle = taskTitle;
		this.taskDescription = taskDescription;
		this.taskDueDate = taskDueDate;
		this.taskPriority = taskPriority;
		this.taskNotes = notes;
		this.taskChecklist = checklist;
		this.taskProjectName = projectName;
	}
}

export class Project {
	constructor(projectName) {
		this.name = projectName;
		this.project = [];
	}
	addTask(...task) {
		task.forEach((element) => this.project.push(element));
	}
	removeTask(...tasks) {
		tasks.forEach((removeTask) => {
			this.project = this.project.filter(
				(element) => element.taskTitle !== removeTask
			);
		});
	}
	changeTask(taskToRemove, ...taskToAdd) {
		this.removeTask(...taskToRemove);
		this.addTask(...taskToAdd);
	}
}
