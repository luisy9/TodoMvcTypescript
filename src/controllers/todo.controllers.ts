/**
 * 
 * Class Controller
 */

import { TodoService } from '../services/todo.service';
import { TodoView } from '../views/todo.views'; 

export class TodoController {
    public service: TodoService;
    public view: TodoView;

    constructor(view: TodoView , service: TodoService) {
        this.service = service;
        this.view = view;

        this.view.submitForm(this.dataForm);
    }

    dataForm(text: string){
        this.service.addTodo(text);
    }
}