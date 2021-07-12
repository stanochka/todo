import 'material-icons/iconfont/material-icons.css';
import './style.css';
import { render, renderNewTask, renderNewProject, renderProjectsMenu } from './render.js';

const content = document.querySelector('#content');
const sidelinks = document.querySelectorAll('.sidelink');
const logo = document.querySelector('#logo');
const ntb = document.querySelector('#newtask');
const npb = document.querySelector('#newproject');
const taskModal = document.querySelector('#newTaskModal');
const projectModal = document.querySelector('#newProjectModal');
const taskModalClose = document.querySelector('#closeTaskModal');
const projectModalClose = document.querySelector('#closeProjectModal');

sidelinks.forEach((a) => {
  a.addEventListener('click', () => render(a.id));
});

logo.addEventListener('click', () => render('today'));
ntb.addEventListener('click', () => renderNewTask());
npb.addEventListener('click', () => renderNewProject());

renderProjectsMenu();

taskModalClose.addEventListener('click', () => taskModal.style.display = "none");
projectModalClose.addEventListener('click', () => projectModal.style.display = "none");

window.onclick = function(event) {
  if (event.target == taskModal) taskModal.style.display = "none";
  else if (event.target == projectModal) projectModal.style.display = "none"; }

render('today');
