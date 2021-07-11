import * as app from './application.js';

const render = (link) => {
  const content = document.querySelector('#content');

  while (content.childElementCount) content.lastChild.remove();

  const headings = { today: 'Today tasks',
                     week: 'This week tasks',
                     all: 'All tasks',
                     important: 'Important tasks' }

  const funcs = { today: app.todayTasks,
                  week: app.weekTasks,
                  all: app.allTasks,
                  important: app.importantTasks }

  var h1 = document.createElement('h1');
  h1.textContent = headings[link];
  content.appendChild(h1);


  var ul = document.createElement('ul');
  var tasks = funcs[link]();
  if (tasks.length>0) {
    tasks.forEach(task => {
    let li = document.createElement('li');
    li.textContent = `${task.title} due to ${task.dueDate.toDateString()}`;
    ul.appendChild(li);
  })
  }
  content.appendChild(ul);

  var b = document.createElement('button');
  b.classList.add('newTaskButton');
  b.innerHTML = 'New task <span class="material-icons-outlined">add_circle_outline</span>';
  content.appendChild(b);

  b.addEventListener('click', () => renderNewTask());
}

const renderProject = (id) => {
  const content = document.querySelector('#content');
  while (content.childElementCount) content.lastChild.remove();
  var name = app.allProjects()[+id.match(/\d+/)]

  var h1 = document.createElement('h1');
  h1.textContent = name;
  content.appendChild(h1);

  var ul = document.createElement('ul');
  var tasks = app.projectTasks(name);
  if (tasks.length>0) {
    tasks.forEach(task => {
    let li = document.createElement('li');
    li.textContent = `${task.title} due to ${task.dueDate.toDateString()}`;
    ul.appendChild(li);
  })
  }
  content.appendChild(ul);

  var b = document.createElement('button');
  b.classList.add('newTaskButton');
  b.innerHTML = 'New task <span class="material-icons-outlined">add_circle_outline</span>';
  content.appendChild(b);

  b.addEventListener('click', () => renderNewTask());
}

const renderProjectsMenu = () => {
  const projectList = document.querySelector('#projectList');
  //while (projectList.childElementCount) content.lastChild.remove();
  var projects = app.allProjects();
  projects.forEach((project, i) => {
    let li = document.createElement('li');
    let a = document.createElement('a');
    a.classList.add('project');
    a.textContent = project;
    a.id = `project${i}`;
    a.href = '#';
    li.appendChild(a);
    projectList.appendChild(li);
    a.addEventListener('click', () => renderProject(a.id));
  })
}

const renderNewTask = () => {
  //
}

const renderNewProject = () => {
  //
}

export { render, renderProjectsMenu, renderNewTask, renderNewProject }
