export class Task {
  constructor(taskTitle, taskDescription, taskDueDate, taskPriority, notes, checklist) {
    this.taskTitle = taskTitle;
    this.taskDescription = taskDescription;
    this.taskDueDate = taskDueDate;
    this.taskPriority = taskPriority;
    this.taskNotes = notes;
    this.taskChecklist = checklist;
  }
}