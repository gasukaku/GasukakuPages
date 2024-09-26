const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

// Cookie操作関数
function setCookie(name, value) {
  document.cookie = name + '=' + value + '; expires=; path=/';
}

function getCookie(name) {
  const value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
  return value ? value[2] : null;
}

// 課題追加時にCookieに保存
taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newTask = taskInput.value;
  const li = document.createElement('li');
  li.innerHTML = `<span class="task-text">${newTask}</span>
                  <button class="delete-btn">削除</button>
                  <button class="complete-btn">完了</button>`;
  taskList.appendChild(li);
  taskInput.value = '';

  // Cookieに保存するデータの形式をオブジェクトにする
  const taskData = {
    text: newTask,
    completed: false
  };

  // Cookieに保存
  let tasks = getCookie('tasks') ? JSON.parse(getCookie('tasks')) : [];
  tasks.push(taskData);
  setCookie('tasks', JSON.stringify(tasks));
});

// 課題削除、完了、ページロード時の処理
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const li = event.target.parentNode;
    const taskText = li.querySelector('.task-text').textContent;

    // Cookieから該当の課題を削除
    let tasks = JSON.parse(getCookie('tasks'));
    tasks = tasks.filter(task => task.text !== taskText);
    setCookie('tasks', JSON.stringify(tasks));

    li.remove();
  } else if (event.target.classList.contains('complete-btn')) {
    const li = event.target.parentNode;
    const taskText = li.querySelector('.task-text').textContent;

    // Cookieの該当課題のcompletedプロパティをtrueにする
    let tasks = JSON.parse(getCookie('tasks'));
    tasks = tasks.map(task => {
      if (task.text === taskText) {
        task.completed = true;
      }
      return task;
    });
    setCookie('tasks', JSON.stringify(tasks));

    li.classList.add('completed');
  }
});

// ページロード時にCookieから復元
window.onload = () => {
  const tasks = getCookie('tasks');
  if (tasks) {
    const parsedTasks = JSON.parse(tasks);
    parsedTasks.forEach(task => {
      const li = document.createElement('li');
      li.innerHTML = `<span class="task-text">${task.text}</span>
                      <button class="delete-btn">削除</button>
                      <button class="complete-btn">完了</button>`;
      if (task.completed) {
        li.classList.add('completed');
      }
      taskList.appendChild(li);
    });
  }
};