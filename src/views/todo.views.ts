/**
 * 
 * Class TodoView
 */

import { ModelTodo, todo } from '../models/todo.models';
import '../styles.css';

export interface categories {
    id: number;
    name: string;
}

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
    public divButtonsControl: HTMLElement;
    public buttonCategoria: HTMLInputElement;
    public categorieName: string = '';
    public categorias: categories[] = [
        {
            id: 1,
            name: 'Programación'
        },
        {
            id: 2,
            name: 'Libros'
        },
        {
            id: 3,
            name: 'Deportes'
        }
    ]


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
        this.divButtonsControl = this.createElement('div', 'divButtonsControls');
        this.categorias.forEach(e => {
            this.buttonCategoria = document.createElement('input');
            this.buttonCategoria.type = 'checkbox';
            this.buttonCategoria.checked = false;
            this.buttonCategoria.classList.add('checkCategorie');
            this.buttonCategoria.id = e.name as any;
            let nameCategoria = document.createElement('li');
            nameCategoria.classList.add('liCategorias');
            nameCategoria.textContent = e.name;
            nameCategoria.append(this.buttonCategoria);
            this.divButtonsControl.append(nameCategoria);
        })
        this.divControl.append(this.divInput, this.divButton);
        this.form.append(this.titleApp, this.divControl, this.divButtonsControl);
        this.ul = this.createElement('ul', 'listTodos');
        this.list = this.createElement('li', 'listTODOS');
        this.root.append(this.form);
        this.app.append(this.root);
        this.todos = (JSON.parse(localStorage.getItem('todos')) || []);
        this.bindDisplayButtonsCategory();
    }

    get _inputValue() {
        return this.input.value;
    }

    get _categoryName() {
        return this.categorieName;
    }

    _resetInput() {
        return this.input.value = '';
    }

    _resetCheckBox() {
        return this.buttonCategoria.checked = false;
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

            if ((this._inputValue.length > 0) && (this._categoryName.length > 0)) {
                handler({ text: this._inputValue, categoria: this._categoryName });
                this._resetInput();
                this._resetCheckBox();
            }
        })
    }

    bindDisplayButtonsCategory() {
        this.divButtonsControl.addEventListener('click', (event) => {
            const isInputCheck = (event.target as HTMLInputElement).type;
            if (isInputCheck === 'checkbox') {
                event.target.addEventListener('change', (eventCheck) => {
                    const isChecked = (eventCheck.currentTarget as HTMLInputElement).checked;
                    console.log(isChecked);
                    if (isChecked) {
                        const categorie = (event.target as HTMLInputElement).id;
                        this.categorieName = categorie;
                    } else {
                        this.categorieName = '';
                    }
                })
            }
        })
    }


    //Display TODOS
    displayTodo(todos: ModelTodo[]) {
        while (this.list.firstChild) {
            this.list.removeChild(this.list.firstChild);
        }

        if (todos.length > 0) {
            var tableContainer = document.createElement('div');
            tableContainer.classList.add('tableContainer');
            var tabla = document.createElement("table");
            var tblBody = document.createElement("tbody");
            var thead = document.createElement('thead');


            //Reeorganizar el array
            //Array con los nuevos indices
            let nuevoArrTodos = ['complete', 'categoria', 'text', 'id', 'delete'];

            //Nuevo array donde se guardaran los objetos
            let arr = [];

            //Hacemos un foreach para recorrer cada objeto en el array por defecto de todos 'categoria', 'text', 'complete', 'id'
            todos.forEach(e => {
                //Objeto donde se guardara la informacion
                let newObject = {};
                //for of para coger el indice de el array estos indices seran 
                for (const index of nuevoArrTodos) {
                    //guardamos en el indice de nuevoArrTodos 
                    //que es el que tendra newObject con el valor asignado
                    //con el valor de los objetos de los todos, pero con siguiendo los indices de el array nuevoArrTodos
                    newObject[index] = e[index];
                }
                //Crea un nuevo arr y agregamos los nuevos valores al 
                //array de arr mas lo que tenia anteriormente y los guarda en arr.
                arr = [...arr, newObject];
            });

            //thead indices categorias           
            let tr = document.createElement('tr');
            thead.append(tr);

            Object.keys(arr[0]).forEach(index => {
                if ((index != 'id')) {
                    if (index != 'delete') {
                        let th = document.createElement('th');
                        th.textContent = index;
                        tr.appendChild(th);
                    }
                }
            })

            //Creamos la tabla
            arr.forEach((e, index) => {
                let trBody = document.createElement('tr');
                for (let clave in e) {
                    if (clave != 'id') {
                        let td = document.createElement('td');
                        if (clave === 'complete') {
                            let input = document.createElement('input') as HTMLInputElement;
                            input.type = 'checkbox';
                            input.checked = e[clave];
                            td.append(input);
                        }
                        if (clave === 'delete') {
                            let buttonDelete = document.createElement('button') as HTMLButtonElement;
                            buttonDelete.type = 'submit';
                            buttonDelete.textContent = 'delete';
                            buttonDelete.classList.add('btn', 'btn-delete');
                            td.append(buttonDelete);
                        } else {
                            td.textContent += e[clave];
                        }
                        trBody.append(td);
                    }
                }
                tblBody.append(trBody);
            })

        }

        tabla.append(thead, tblBody);
        tableContainer.append(tabla);
        this.app.append(tableContainer);

        // todos.forEach(e => {
        //     const divUl = this.createElement('div', 'divUl');
        //     divUl.id = e.id;
        //     let categorieP = document.createElement('p');
        //     categorieP.textContent = e.categoria;
        //     let checkBox = this.createElement('input', 'checkBoxStyle') as HTMLElement | any;
        //     checkBox.type = 'checkbox';
        //     //si complete es false no esta marcado, si es true se marca
        //     checkBox.checked = e.complete!;
        //     checkBox.id = e.id;
        //     let ul = this.createElement('ul', 'listTodos');
        //     ul.textContent = e.text;
        //     ul.contentEditable = 'true';
        //     ul.id = e.id;
        //     let buttonDelete = this.createElement('button', 'buttonDelete');
        //     buttonDelete.innerText = 'delete';
        //     buttonDelete.id = e.id;
        //     buttonDelete.style.paddingTop = "100";
        //     divUl.append(categorieP, checkBox, ul, buttonDelete);
        //     this.list.append(divUl);
        //     if (e.complete === true) {
        //         ul.classList.add('divChecked');
        //     } else {
        //         ul.classList.remove('divChecked');
        //     }
        // })
        // this.app.append(this.list);
    }

    bindDeleteTodo(handle: Function) {
        this.list.addEventListener('click', (event: Event) => {
            if ((event.target as any).className === 'buttonDelete') {
                const _id = (event.target as any).id;
                handle(_id);
            }
        })
    }

    bindUpdateTodos(handle: Function) {
        this.list.addEventListener('focusout', (event: Event) => {
            const id = (event.target as HTMLElement).id;
            const textEdit = (event.target as HTMLElement).innerText;
            handle(id, textEdit);
        });
    }

    bindTodoChecked(handle: Function) {
        this.list.addEventListener('change', (event: Event) => {
            const checkBox = (event.target as any).type === 'checkbox';
            if (checkBox) {
                const id = (event.target as any).parentElement.id;
                handle(id);
            }
        })
    }
}