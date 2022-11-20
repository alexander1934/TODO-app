//Поиск элементов на странице
let text = document.querySelector(".input__field");
let addButton = document.querySelector(".input__button");
let todo = document.querySelector(".todo");
let deleteDoneButton = document.querySelector(".control-buttons__item_1");
let deleteButton = document.querySelector(".control-buttons__item_2");

//  Массив с задачами и манипуляция с localStorage
let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((task) => {
    const status = task.done ? "todo__p todo__p_strike" : "todo__p";

    let valueHTML = `<div class="todo__item" id="${task.id}">
    <p class="${status}">${task.text}</p>
    <div class="button-block">
        <button class="button-block__item_completed" data-action="completed"></button>
        <button class="button-block__item_delete" data-action="delete">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M22,5H17V2a1,1,0,0,0-1-1H8A1,1,0,0,0,7,2V5H2A1,1,0,0,0,2,7H3.061L4,22.063A1,1,0,0,0,5,23H19a1,1,0,0,0,1-.937L20.939,7H22a1,1,0,0,0,0-2ZM9,3h6V5H9Zm9.061,18H5.939L5.064,7H18.936ZM9,11v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm4,0v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm3-1a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V11A1,1,0,0,1,16,10Z"/>
            </svg>
        </button>
    </div>
  </div>`;
    todo.insertAdjacentHTML("beforeend", valueHTML);
  });
}

// Прослушка на Enter
text.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addItem();
  }
});

// Добавление пункта
addButton.addEventListener("click", addItem);

// Удаление пункта
todo.addEventListener("click", removeItem);

// Зачеркивание выполненной задачи
todo.addEventListener("click", crossOutItem);

//Удаление выполненного
deleteDoneButton.addEventListener("click", deleteDone)

//Удаление всего
deleteButton.addEventListener("click", deleteAll)

//Функции
function addItem() {
  if (text.value === "") {
    return;
  }

  // обьект задачи
  const item = {
    id: Date.now(),
    text: text.value,
    done: false,
  };

  tasks.push(item);

  const status = item.done ? "todo__p todo__p_strike" : "todo__p";

  let valueHTML = `<div class="todo__item" id="${item.id}">
  <p class="${status}">${item.text}</p>
  <div class="button-block">
      <button class="button-block__item_completed" data-action="completed"></button>
      <button class="button-block__item_delete" data-action="delete">
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22,5H17V2a1,1,0,0,0-1-1H8A1,1,0,0,0,7,2V5H2A1,1,0,0,0,2,7H3.061L4,22.063A1,1,0,0,0,5,23H19a1,1,0,0,0,1-.937L20.939,7H22a1,1,0,0,0,0-2ZM9,3h6V5H9Zm9.061,18H5.939L5.064,7H18.936ZM9,11v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm4,0v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm3-1a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V11A1,1,0,0,1,16,10Z"/>
          </svg>
      </button>
  </div>
</div>`;
  todo.insertAdjacentHTML("beforeend", valueHTML);
  text.value = "";
  text.focus();

  saveToLocalStorage();
}

function removeItem(event) {
  if (event.target.dataset.action === "delete") {
    let parent = event.target.closest(".todo__item");

    const index = tasks.findIndex((task) => {
      if (parent.id == task.id) {
        return true;
      }
    });

    //Удаление из элемента из массива
    tasks.splice(index, 1);

    parent.remove();

    saveToLocalStorage();
  }
}

function crossOutItem(event) {
  if (event.target.dataset.action === "completed") {
    let parent = event.target.closest(".todo__item");
    let p = parent.querySelector(".todo__p");

    // Найти ID
    const item = tasks.find((task) => {
      if (task.id == parent.id) {
        return true;
      }
    });

    item.done = !item.done;

    p.classList.toggle("todo__p_strike");

    saveToLocalStorage();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteAll (event) {
  console.log("click")
  let parent = event.target.closest(".app");
  let item = parent.querySelectorAll(".todo__item");
  item.forEach( e => e.remove() );
  tasks = [];
  saveToLocalStorage();
}

function deleteDone (event){
  let parent = event.target.closest(".app");
  let item = parent.getElementsByClassName("todo__p_strike");
  let itemArray = Array.from(item);

  for ( let i = 0; i<itemArray.length; i++){
    let abc = itemArray[i].closest(".todo__item")
    abc.remove();
    const index = tasks.findIndex((task) => {
      if (abc.done == true) {
        return true;
      }
    });

    //Удаление из элемента из массива
    tasks.splice(index, 1);
  }
  saveToLocalStorage();
}