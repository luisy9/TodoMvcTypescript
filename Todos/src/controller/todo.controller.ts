/**
 * 
 * Class Controller
 */

import { TodoService } from '../service/todo.service';
import { TodoView } from '../views/todo.view'; 

export class TodoController {
    public service: TodoService;
    public view: TodoView;

    constructor(view: TodoView , service: TodoService) {
        this.service = service;
        this.view = view;
    }
}