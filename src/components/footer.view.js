import {domUtils} from 'richardUtils';
var {$} = domUtils;

export function FooterView(model, events) {

  /*
   *  Clear completed button
   *
   * Removes completed todos when clicked. Should be hidden when there are no completed todos.
   */

  var clearEl = $('#clear-completed');

  events.onPropertyChange('todos', render); 

  function render() {
    var button = document.createElement('button');
    button.className = 'clear-completed';
    button.textContent = 'Clear completed';
    clearEl.innerHTML = '';

    button.addEventListener('click', () => {
      model.todos = model.todos.filter(todo => !todo.completed);
    });

    clearEl.append(button);

    const allTodosPending = model.todos.every(todo => !todo.completed);

    if (allTodosPending) {
      clearEl.style.visibility = 'hidden';
    } else {
      clearEl.style.visibility = 'visible';
    }
  }

  render();
}
