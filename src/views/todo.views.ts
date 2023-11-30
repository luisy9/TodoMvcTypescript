/**
 * 
 * Class TodoView
 */

import { ModelTodo, todo } from '../models/todo.models';
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
    public ul: HTMLElement;
    public todos: todo[];
    public buttonDelete: HTMLElement;

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
        this.ul = this.createElement('ul', 'listTodos');
        this.list = this.createElement('li', 'listTODOS');
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
            if (this._inputValue.length > 0) {
                handler({ text: this._inputValue });
                this._resetInput();
            }
        })
    }


    //Display TODOS
    displayTodo(todos: ModelTodo[]) {
        console.log(todos)
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }

        if (todos.length > 0) {
            todos.forEach(e => {
                const divUl = this.createElement('div', 'divUl');
                divUl.id = e.id;
                let checkBox = this.createElement('input', 'checkBoxStyle') as HTMLElement | any;
                checkBox.type = 'checkbox';
                checkBox.id = e.id;
                let ul = this.createElement('ul', 'listTodos');
                ul.textContent = e.text;
                ul.contentEditable = 'true';
                let buttonDelete = this.createElement('button', 'buttonDelete');
                buttonDelete.innerText = 'delete';
                buttonDelete.id = e.id;
                buttonDelete.style.paddingTop = "100";
                divUl.append(checkBox, ul, buttonDelete);
                this.list.append(divUl);
                if (e.complete === true) {
                    ul.classList.add('divChecked');
                } else {
                    ul.classList.remove('divChecked');
                }
            })
            this.app.append(this.list);
        }
    }

    bindDeleteTodo(handle: Function) {
        this.list.addEventListener('click', (event) => {
            if ((event.target as any).className === 'buttonDelete') {
                const _id = (event.target as any).id;
                handle(_id);
            }
        })
    }

    bindUpdateTodos(handle: Function) {
        this.list.addEventListener('click', (event) => {
            const ulEditable = (event.target as any).className === 'listTodos';
            if (ulEditable) {
                event.target.addEventListener('input', (event) => {
                    let valueEditable = document.querySelector('ul').innerText;
                    handle(valueEditable);
                })
            }
        });
    }

    bindTodoChecked(handle: Function) {
        this.list.addEventListener('change', (event) => {
            const checkBox = (event.target as any).type === 'checkbox';
            if (checkBox) {
                const id = (event.target as any).parentElement.id;
                handle(id);
            }
        })
    }
}