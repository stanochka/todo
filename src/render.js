import * as app from './application.js';

const content = document.querySelector('#content');
const projectList = document.querySelector('#projectList');
const newTaskModal = document.querySelector('#newTaskModal');
const editTaskModal = document.querySelector('#editTaskModal');
const projectModal = document.querySelector('#newProjectModal');
const settingsModal = document.querySelector('#settingsModal');

const render = (link) => {
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

  var tasks = funcs[link]();

  renderHelper(tasks);
  localStorage.setItem('currentPage', link);
}

const renderProject = (id) => {
  while (content.childElementCount) content.lastChild.remove();
  var name = app.allProjects()[+id.match(/\d+/)]

  var h1 = document.createElement('h1');
  h1.textContent = name;
  if (name !== 'Default') {
    var deleteProjectButton = document.createElement('button');
    deleteProjectButton.style = 'vertical-align: middle; font-size: .6rem; padding: 2px; margin: 15px; border-radius: 4px; background: red;'
    deleteProjectButton.innerHTML = '<span class="material-icons-outlined" style="font-size: 16px;">delete</span>';
    h1.appendChild(deleteProjectButton);

    deleteProjectButton.addEventListener('click', () => {
      app.deleteProject(name);
      renderProject('project0');
      renderProjectsMenu();
    });
  }

  content.appendChild(h1);

  var tasks = app.projectTasks(name);

  renderHelper(tasks);
  localStorage.setItem('currentPage', id);
}

const renderHelper = (tasks) => {
  var ul = document.createElement('ul');
  if (tasks.length>0) {
    tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate)).forEach(task => {
    let li = document.createElement('li');
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.name = task.title;
    checkbox.value = "complete";
    li.appendChild(checkbox);
    let a = document.createElement('a');
    task.dueDate ?
    a.textContent = `${task.title} - due to ${new Date(task.dueDate).toDateString()}` :
    a.textContent = `${task.title}`;
    if (task.complete) {
      a.style['text-decoration'] = 'line-through';
      checkbox.checked = true;
    }
    let span = document.createElement('span');
    span.textContent = 'error_outline';
    span.classList.add('material-icons-outlined');
    span.style.color = 'red';
    span.style['vertical-align'] = 'text-bottom';
    span.style['font-size'] = '1.2em'
    task.important ? span.style.display = 'inline-block' : span.style.display = 'none';
    let button = document.createElement('button');
    button.style = 'vertical-align: middle; font-size: .8rem; padding: 2px; margin: 10px; border-radius: 4px; background: red;'
    button.innerHTML = '<span class="material-icons-outlined" style="font-size: 16px; vertical-align: middle;">delete</span>';
    li.appendChild(a);
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);

    checkbox.addEventListener('change', () => {
      app.changeStatus(task);
      task.complete ?
      a.style['text-decoration'] = 'line-through' :
      a.style['text-decoration'] = 'none';
      }
    );

    a.addEventListener('click', () => {
      renderEditTask(task);
      let page = localStorage.getItem('currentPage') || 'today';
      /project\d+/.test(page) ? renderProject(page) : render(page);
    });
    button.addEventListener('click', () => {
      app.deleteTask(task);
      let page = localStorage.getItem('currentPage');
      /project\d+/.test(page) ? renderProject(page) : render(page);
  });

  })
  }
  content.appendChild(ul);

  var b = document.createElement('button');
  b.classList.add('newTaskButton');
  b.id = 'newTaskButton';
  b.innerHTML = 'New task <span class="material-icons-outlined">add_circle_outline</span>';
  content.appendChild(b);

  b.addEventListener('click', () => renderNewTask());
}

const renderProjectsMenu = () => {
  while (projectList.childElementCount > 1) projectList.lastChild.remove();
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
   newTaskModal.style.display = "block";
   const form = document.querySelector('#newTaskForm');
   const select = document.querySelector('select#project');
   var projects = app.allProjects();
   projects.forEach(project => {
     var option = document.createElement('option');
     option.textContent = project;
     option.value = project;
     select.appendChild(option);
   })
   form.addEventListener('submit', () => {
     let title = form.elements.title.value;
     let dueDate = form.elements.dueDate.value;
     let important = form.elements.important.checked;
     let project = form.elements.project.value;
     app.createTask(title, dueDate, important, project);
     return false;
   });
}

const renderEditTask = (task) => {
   editTaskModal.style.display = "block";
   const form = document.querySelector('#editTaskForm');
   const select = document.querySelector('#selectProject');
   form.elements.title.defaultValue = task.title;
   form.elements.dueDate.defaultValue = task.dueDate;
   var imp = false;
   if (task.important) {
     form.elements.important.checked = true;
     imp = true;
   }
   var projects = app.allProjects();
   projects.forEach(project => {
     var option = document.createElement('option');
     option.textContent = project;
     option.value = project;
     select.appendChild(option);
   })
   form.elements.project.defaultValue = task.project;
   for (let option of form.elements.project.options) {
     if (option.value === task.project) option.selected = true;
   }
   form.addEventListener('submit', () => {
     var changed = {};
     [form.elements.title, form.elements.dueDate, form.elements.project].forEach(el => {
       if (el.defaultValue !== el.value) {
         changed[el.name] = el.value;
       }
     });
     if (form.elements.important.checked !== imp) changed['important'] = form.elements.important.checked;
     app.updateTask(task, changed);
     return false;
   });
}

const renderNewProject = () => {
  projectModal.style.display = "block";
  const form = document.querySelector('#newProjectForm');
  form.addEventListener('submit', () => {
    let title = form.elements.title.value;
    app.createProject(title);
    renderProjectsMenu();
  });
}

const renderSettings = () => {
  settingsModal.style.display = "block";
  const form = document.querySelector('#settingsForm');
  form.addEventListener('submit', () => {
    let color = document.querySelector('input[name="theme"]:checked').value;
    changeTheme(color);
    return false;
  });
  const deleteAllButton = document.querySelector('#deleteAll');
  deleteAllButton.addEventListener('click', () => {
    if (confirm('Are you sure?')) {
      app.deleteAll();
      render('today');
    }
  })
}

const changeTheme = (color) => {
  let root = document.documentElement;
  const COLORS = { red: '#F03C5D', blue: '#4074cc', green: '#23c175' }
  root.style.setProperty('--themeColor', COLORS[color]);
  localStorage.setItem('themeColor', color);
}

export { render, renderProject, renderProjectsMenu, renderNewTask, renderNewProject, renderSettings, changeTheme }
