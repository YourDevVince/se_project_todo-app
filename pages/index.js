import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

import { initialTodos, validationConfig } from '../utils/constants.js';
import Todo from '../components/Todo.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopupWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector('.button_action_add');
const addTodoPopupEl = document.querySelector('#add-todo-popup');
const addTodoForm = addTodoPopupEl.querySelector('.popup__form');

const todosListEl = '.todos__list';
const todoTemplateSelector = '#todo-template';

function handleCheck(completed) {
  if (completed) {
    todoCounter.updateCompleted(true);
  } else {
    todoCounter.updateCompleted(false);
  }
}

function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

const generateTodo = (data) => {
  const todo = new Todo(data, todoTemplateSelector, handleCheck, handleDelete);
  const todoElement = todo.getView();
  return todoElement;
};

const todoCounter = new TodoCounter(initialTodos, '.counter__text');

const addTodoPopup = new PopupWithForm({
  popupSelector: '#add-todo-popup',
  handleFormSubmit: (inputValues) => {
    const { name, date } = inputValues;

    const dateObj = new Date(date);
    dateObj.setMinutes(dateObj.getMinutes() + dateObj.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date: dateObj, id, completed: false };
    const todoEl = generateTodo(values);
    section.addItem(todoEl);

    todoCounter.updateTotal(true);
    addTodoPopup.close();
    newTodoFormValidator.resetValidation();
  },
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoEl = generateTodo(item);
    section.addItem(todoEl);
  },
  containerSelector: todosListEl,
});

section.renderItems();

addTodoButton.addEventListener('click', () => {
  addTodoPopup.open();
});

const newTodoFormValidator = new FormValidator(validationConfig, addTodoForm);
newTodoFormValidator.enableValidation();
