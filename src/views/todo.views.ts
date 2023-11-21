/**
 * 
 * Class TodoView
 */

import { todo } from '../models/todo.models';
import '../styles.css';
export class TodoView {
    public app: HTMLElement;
    public root: HTMLElement;
    public titleApp: HTMLElement;
    public form: HTMLElement;
    public divForm: HTMLElement;
    public divControl: HTMLElement;
    public divInput: HTMLElement;
    public input: HTMLInputElement;
    public divButton: HTMLElement;
    public buttonSubmit: HTMLElement;
    public list: HTMLElement;
    public todos: todo[];
    constructor() {
        this.app = document.getElementById('root');
        this.root = this.createElement('div', 'div-app');
        this.form = this.createElement('form', 'form-app');
        this.titleApp = this.createElement('h1', 'titleApp');
        this.titleApp.textContent = 'App Todo';
        this.divControl = this.createElement('div', 'div-control');
        this.divInput = this.createElement('div', 'div-input');
        this.input = this.createElement('input', 'input-note') as HTMLInputElement;
        this.input.type = 'text';
        this.divInput.append(this.input);
        this.divButton = this.createElement('div', 'div-button');
        this.buttonSubmit = this.createElement('button', 'buttonForm');
        this.buttonSubmit.textContent = 'Submit';
        this.divButton.append(this.buttonSubmit);
        this.divControl.append(this.divInput, this.divButton);
        this.form.append(this.titleApp, this.divControl);
        // this.list = this.createElement('li', 'listTODOS');
        this.root.append(this.form);
        this.app.append(this.root);
        this.todos = (JSON.parse(localStorage.getItem('todos')) || []);
    }

    get _inputValue() {
        return this.input.value;
    }

    _resetInput() {
        return this.input.value = '';
    }

    createElement(elemnt: string, className: string) {
        const newElement = document.createElement(elemnt);
        if (className) {
            newElement.classList.add(className);
        }
        return newElement;
    }

    inputTodo() {
        this.input.addEventListener('change', (event) => {
            console.log(event.target);
        })
    }

    //Pasamos los datos de el form para crear un Todo
    bindSubmitForm(handler: Function = () => { }) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            handler({ text: this._inputValue });
            this._resetInput();
        })
    }


    //Display TODOS
    displayTodo(todos: todo[]) {
        if (todos) {
            const list = this.createElement('li', 'listTodos');
            todos.forEach(e => {
                let li = this.createElement('li', 'todoli');
                li.innerHTML = e.text;
                list.append(li);
            })

            this.root.append(list);
        }
    }
}