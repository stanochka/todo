import 'material-icons/iconfont/material-icons.css';
import './style.css';
import { render, renderNewTask, renderNewProject, renderProjectsMenu } from './render.js';

const content = document.querySelector('#content');
const sidelinks = document.querySelectorAll('.sidelink');
const logo = document.querySelector('#logo');
const ntb = document.querySelector('#newtask');
const npb = document.querySelector('#newproject');
const newTaskModal = document.querySelector('#newTaskModal');
const editTaskModal = document.querySelector('#editTaskModal');
const projectModal = document.querySelector('#newProjectModal');
const newModalClose = document.querySelector('#closeNewTaskModal');
const editModalClose = document.querySelector('#closeEditTaskModal');
const projectModalClose = document.querySelector('#closeProjectModal');

sidelinks.forEach((a) => {
  a.addEventListener('click', () => render(a.id));
});

logo.addEventListener('click', () => render('today'));
ntb.addEventListener('click', () => renderNewTask());
npb.addEventListener('click', () => renderNewProject());

renderProjectsMenu();

newModalClose.addEventListener('click', () => newTaskModal.style.display = "none");
editModalClose.addEventListener('click', () => editTaskModal.style.display = "none");
projectModalClose.addEventListener('click', () => projectModal.style.display = "none");

window.onclick = function(event) {
  if (event.target == newTaskModal) newTaskModal.style.display = "none";
  else if (event.target == editTaskModal) editTaskModal.style.display = "none";
  else if (event.target == projectModal) projectModal.style.display = "none";
}

render('today');
