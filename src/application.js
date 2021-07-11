import { isToday, isThisWeek } from 'date-fns';

var tasks = [];
var projects = ['Default'];

function Task(id, title, dueDate, important, project) {
    this.id = id;
    this.title = title;
    this.dueDate = dueDate;
    this.important = important;
    this.project = project;
    this.complete = false;
}

function changeStatus(task) {
  task.complete === false ?  task.complete = true : task.complete = false;
}

function createTask(title, dueDate=(new Date()), important=false, project=projects[0]) {
  let id = tasks.length;
  let task = new Task(id, title, dueDate, important, project);
  tasks.push(task);
  if (!projects.includes(task.project)) projects.push(task.project);
}

function getTask(id) {
  return tasks.filter(task => task.id === id)[0];
}

function updateTask(task, properties) {
  Object.keys(properties).forEach(property => {
    task[property] = properties[property];
    if (property === 'project' && !projects.includes(task.project)) projects.push(task.project);
  });
}

function deleteTask(task) {
  tasks.splice(task.id, 1);
}

function todayTasks() { return tasks.filter(task => isToday(task.dueDate)) };
function weekTasks() { return tasks.filter(task => isThisWeek(task.dueDate)) };
function allTasks() { return tasks };
function importantTasks() { return tasks.filter(task => task.important) };
function projectTasks(name) { return tasks.filter(task => task.project === name) }
function allProjects() { return projects };

function createProject(title) {
  projects.push(title);
}

createTask('Test1', new Date('2021-09-01'), true, 'Work');
createTask('Test2', new Date('2021-07-31'), false, 'Work');
createTask('Test3', new Date('2021-07-11'), true, 'Work');
createTask('Test4', new Date('2021-07-31'), false, 'Work');
createTask('Test5', undefined, true);
changeStatus(tasks[2]);
updateTask(tasks[0], {project: 'Home'});

export { changeStatus,
         createTask,
         getTask,
         updateTask,
         deleteTask,
         todayTasks,
         weekTasks,
         allTasks,
         importantTasks,
         projectTasks,
         allProjects,
         createProject}

/*
createTask('Test1', new Date('2021-09-01'), true, 'Work');
createTask('Test2', new Date('2021-07-31'), false, 'Work');
createTask('Test3', new Date('2021-07-11'), true, 'Work');
createTask('Test4', new Date('2021-07-31'), false, 'Work');
createTask('Test5', undefined, true);
changeStatus(tasks[2]);
updateTask(tasks[0], {project: 'Home'});

console.log(projects);
console.log(projectTasks('Work'));
*/
