import {domUtils} from 'richardUtils';
var {$} = domUtils;

export function CounterView(model, events) {

  /*  Counter
   *
   *  Displays the number of active todos in a pluralized form.
   *  Make sure the number is wrapped by a <strong> tag.
   *  Also make sure to pluralize the item word correctly:
   *  0 items, 1 item, 2 items. Example: 2 items left
   */

  var counterEl = $('#todo-count');

  function createCounterView(count) {
    var text = count === 1 ? 'item left' : 'items left';

    return `
      <strong>${count}</strong> ${text}
    `;
  }

  events.onPropertyChange('todos', render);

  function render() {
    var items = model.todos.filter(todo => !todo.completed).length;
    counterEl.innerHTML = createCounterView(items);
  }

  render();

}
