import { isToday, isThisWeek, parseISO } from 'date-fns';

var tasks = JSON.parse(localStorage.getItem('tasks'));
if (tasks === null) {
  localStorage.setItem('tasks', JSON.stringify([]));
  tasks = JSON.parse(localStorage.getItem('tasks'));
}

var projects = JSON.parse(localStorage.getItem('projects'));
if (projects === null) {
  localStorage.setItem('projects', JSON.stringify(['Default']));
  projects = JSON.parse(localStorage.getItem('projects'));
}

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
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(title, dueDate=(new Date()), important=false, project=projects[0]) {
  let id = tasks.length;
  let task = new Task(id, title, dueDate, important, project);
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  if (!projects.includes(task.project)) {
    projects.push(task.project);
    localStorage.setItem('projects', JSON.stringify(projects));
  }
}

function updateTask(task, properties) {
  Object.keys(properties).forEach(property => {
    task[property] = properties[property];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    if (property === 'project' && !projects.includes(task.project)) {
      projects.push(task.project);
      localStorage.setItem('projects', JSON.stringify(projects));
    }
  });
}

function deleteTask(task) {
  tasks.splice(tasks.indexOf(task), 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function todayTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks.filter(task => isToday(parseISO(task.dueDate)))
}

function weekTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks.filter(task => isThisWeek(parseISO(task.dueDate)))
}

function allTasks() {
  return JSON.parse(localStorage.getItem('tasks'));
}

function importantTasks() {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks.filter(task => task.important)
}

function projectTasks(name) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  return tasks.filter(task => task.project === name);
}

function allProjects() {
  return JSON.parse(localStorage.getItem('projects'));
}

function createProject(title) {
  projects.push(title);
  localStorage.setItem('projects', JSON.stringify(projects));
}

function deleteProject(project) {
  tasks.filter(task => task.project === project).forEach(task => task.project = 'Default');
  localStorage.setItem('tasks', JSON.stringify(tasks));
  projects.splice(projects.indexOf(project), 1);
  localStorage.setItem('projects', JSON.stringify(projects));
}

function deleteAll() {
  localStorage.setItem('tasks', JSON.stringify([]));
  localStorage.setItem('projects', JSON.stringify(['Default']));
}

export { changeStatus,
         createTask,
         updateTask,
         deleteTask,
         todayTasks,
         weekTasks,
         allTasks,
         importantTasks,
         projectTasks,
         allProjects,
         createProject,
         deleteProject,
         deleteAll }
