import 'todomvc-common/base.css';
import 'todomvc-app-css/index.css';
import './css/app.css';
import {mvc, domUtils} from 'richardUtils';
import {InputView} from './components/input.view';
import {ListView} from './components/list.view';
import {CounterView} from './components/counter.view';
import {FooterView} from './components/footer.view';
var {$} = domUtils;

var events = new mvc.Events();

var model = {
  todos: [{
    title: 'banana',
    completed:  true,
  }]
};

var proxy = mvc.createProxy(model, events);

var inputView = mvc.createComponent(proxy, InputView, events);
var listView = mvc.createComponent(proxy, ListView, events);
var counterView = mvc.createComponent(proxy, CounterView, events);
var footerView = mvc.createComponent(proxy, FooterView, events);


function hideMainAndFooter() {
  var mainEl = $('#main');
  var footerEl = $('#footer');

  if (model.todos.length > 0) {
    mainEl.style.display = 'block';
    footerEl.style.display = 'block';
  } else {
    mainEl.style.display = 'none';
    footerEl.style.display = 'none';
  }
}

events.onPropertyChange('todos', hideMainAndFooter);

hideMainAndFooter();

