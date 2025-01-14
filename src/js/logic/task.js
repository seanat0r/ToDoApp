export class Task {
  constructor(taskTitle, taskDescription, taskDueDate, taskPriority, notes, checklist, projectName) {
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
    this.name = projectName
    this.project = []
  }
  addTask(...task) {
    task.forEach(element => this.project.push(element));
  }
  removeTask(task) {
    this.project.forEach((element) => {
      if (element.taskTitle = task) {
        return element
      } 
    })
  }
}