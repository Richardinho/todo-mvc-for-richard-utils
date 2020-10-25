import {domUtils} from 'richardUtils';
import {mvc} from 'richardUtils';

var {$} = domUtils;
var {utils} = mvc;

function createTodoView(title, complete) {
  return `
    <div class="view">
      <input class="toggle" type="checkbox" ${complete && 'checked'}>
      <label>${title}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="">
  `;
}

export function ListView(model, events) {

  var todoList = $('#todo-list');

  function render() {
    todoList.innerHTML = '';

    var frag = document.createDocumentFragment();

    model.todos.forEach((todo, index) => {
      const li = document.createElement('li');

      if (todo.completed) {
        li.className = 'completed';
      }

      li.innerHTML = createTodoView(todo.title, todo.completed);

      /*
       *  Item
       *
       *  A todo item has three possible interactions:
       *  1. Clicking the checkbox marks the todo as complete by updating its completed value and toggling the class completed on its parent <li>
       *  2. Double-clicking the <label> activates editing mode, by toggling the .editing class on its <li>
       *  3. Hovering over the todo shows the remove button (.destroy)
       */

      /* 
       *  Editing
       *
       *  When editing mode is activated it will hide the other controls and bring forward an input that contains the todo title,
       *  which should be focused (.focus()). The edit should be saved on both blur and enter, and the editing class should be removed.
       *  Make sure to .trim() the input and then check that it's not empty.
       *  If it's empty the todo should instead be destroyed.
       *  If escape is pressed during the edit, the edit state should be left and any changes be discarded.
       */

      $('.toggle', li).addEventListener('change', () => {
        model.todos = model.todos.map((todo, i) => {
          if (i === index) {
            return {
              ...todo,
              completed: !todo.completed,
            };
          }

          return todo;
        });
      });

      $('button', li).addEventListener('click', () => {
        model.todos = utils.arraySplice(model.todos, index);
      });

      var editInput = $('.edit', li);

      $('label', li).addEventListener('dblclick', () => {
        li.classList.add('editing');
        editInput.value = todo.title;
        editInput.focus();
        editInput.select();
      });

      editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          editInput.value = todo.title;
          li.classList.remove('editing');
        }
      });

      editInput.addEventListener('change', (event) => {
        var newVal = event.target.value.trim();

        if (newVal) {
          model.todos = model.todos.map((todo, i) => {
            if (i === index) {
              return {
                ...todo,
                title: newVal,
              };
            }

            return todo;
          });
        } else {
          model.todos = model.todos.filter((_, i) => {
            return i !== index;
          });
        }
      });

      frag.appendChild(li);
    });

    todoList.appendChild(frag);
  }

  events.onPropertyChange('todos', render);

  render();
}
