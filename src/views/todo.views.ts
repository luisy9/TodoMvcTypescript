/**
 * 
 * Class TodoView
 */

import '../styles.css';
export class TodoView {
    public app: HTMLElement;
    public root: HTMLElement;
    public titleApp: HTMLElement;
    public form: HTMLElement;
    public divForm: HTMLElement;
    public divControl: HTMLElement;
    public input: HTMLInputElement;
    public buttonSubmit: HTMLElement;
    constructor() {
        this.app = document.getElementById('root');
        this.root = this.createElement('div', 'div-app');
        this.form = this.createElement('form', 'form-app');
        this.titleApp = this.createElement('h1', 'titleApp');
        this.titleApp.textContent = 'App Todo';
        this.divControl = this.createElement('div', 'div-control');
        this.input = this.createElement('input', 'input-note') as HTMLInputElement;
        this.input.type = 'text';
        this.buttonSubmit = this.createElement('button', 'buttonForm');
        this.buttonSubmit.textContent = 'Submit';
        this.divControl.append(this.input, this.buttonSubmit);
        this.form.append(this.titleApp, this.divControl);
        this.root.append(this.form);
        this.app.append(this.root);
    }

    get _inputValue(){
        return this.input.value;
    }


    createElement(elemnt: string, className: string) {
        const newElement = document.createElement(elemnt);
        if (className) {
            newElement.classList.add(className);
        }
        return newElement;
    }

    submitForm(handler: Function = () => {}) {
        this.form.addEventListener('submit', event => {
            event.preventDefault();
            console.log(`${this.input.value} Hola`);
        })
    }
}