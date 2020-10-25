import {domUtils} from 'richardUtils';
import {mvc} from 'richardUtils';
var {utils} = mvc;
var {$} = domUtils;

export function InputView(model, events) {

  var inputEl = $('#new-todo');
  var toggleAllEl = $('#toggle-all');

  /*
   *  New Todos
   *  New todos are entered in the input at the top of the app.
   *  The input element should be focused when the page is loaded,
   *  preferably by using the autofocus input attribute.
   *  Pressing Enter creates the todo, appends it to the todo list,
   *  and clears the input. Make sure to .trim() the input
   *  and then check that it's not empty before creating a new todo.
   */

  function submit(event) {
    const newToDoTitle = event.target.value.trim();

    if (newToDoTitle) {
      model.todos = utils.arrayPush(model.todos, {
        title: newToDoTitle,
        completed: false,
      });
      
      inputEl.value = '';
    }
  }


  /*
   *  Mark All as complete
   *  This checkbox toggles all the todos to the same state as itself. Make sure to clear the checked state
   *  after the "Clear completed" button is clicked.
   *  The "Mark all as complete" checkbox should also be updated when single
   *  todo items are checked/unchecked.
   *  Eg. When all the todos are checked it should also get checked.
   */

  function toggleAll(event) {

    model.todos = model.todos.map(todo => ({
      ...todo,
      completed: event.target.checked,
    }));
  }

  events.onPropertyChange('todos', function () {
    toggleAllEl.checked = model.todos.every(todo => todo.completed);
  });

  inputEl.addEventListener('change', submit);
  toggleAllEl.addEventListener('change', toggleAll);

}
