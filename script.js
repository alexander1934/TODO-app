let text = document.querySelector(".input__field");
let addButton = document.querySelector(".input__button");
let todo = document.querySelector(".todo");

// Добавление пункта

addButton.addEventListener("click", addItem);

text.addEventListener("keypress", (event) => {
  if (event.key === "Enter"){
    addItem();
  }
})

function addItem(){
  if (text.value === ""){
    return
  }
  let valueHTML = `<div class="todo__item">
  <p class="todo__p">${text.value}</p>
  <div class="button-block">
      <button class="button-block__item_completed" data-action="completed"></button>
      <button class="button-block__item_delete" data-action="delete">
          <svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M22,5H17V2a1,1,0,0,0-1-1H8A1,1,0,0,0,7,2V5H2A1,1,0,0,0,2,7H3.061L4,22.063A1,1,0,0,0,5,23H19a1,1,0,0,0,1-.937L20.939,7H22a1,1,0,0,0,0-2ZM9,3h6V5H9Zm9.061,18H5.939L5.064,7H18.936ZM9,11v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm4,0v6a1,1,0,0,1-2,0V11a1,1,0,0,1,2,0Zm3-1a1,1,0,0,1,1,1v6a1,1,0,0,1-2,0V11A1,1,0,0,1,16,10Z"/>
          </svg>
      </button>
  </div>
</div>`;
  todo.insertAdjacentHTML('beforeend', valueHTML);
  text.value = "";
  text.focus();
}

// Удаление пункта

todo.addEventListener('click', removeItem);

function removeItem(event) {
  if (event.target.dataset.action === 'delete'){
    let parent = event.target.closest('.todo__item')
    parent.remove()
  }
}

// Зачеркивание выполненной задачи

todo.addEventListener('click', crossOutItem);

function crossOutItem (event) {
  if (event.target.dataset.action === 'completed') {
    let parent = event.target.closest(".todo__item");
    let p = parent.querySelector(".todo__p");
    p.classList.toggle("todo__p_strike");
  }
}