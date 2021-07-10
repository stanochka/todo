const render = () => {
  const content = document.querySelector('#content');

  let h1 = document.createElement('h1');
  h1.textContent = 'Tasks';
  content.appendChild(h1);

  //TODO: insert list of tasks rendering

  let b = document.createElement('button');
  b.classList.add('newTaskButton');
  b.innerHTML = 'New task <span class="material-icons-outlined">add_circle_outline</span>';
  content.appendChild(b);
}

export { render }
