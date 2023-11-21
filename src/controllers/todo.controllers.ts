/**
 * 
 * Class Controller
 */

import { ModelTodo, todo } from '../models/todo.models';
import { TodoService } from '../services/todo.service';
import { TodoView } from '../views/todo.views';

export class TodoController {
    private service: TodoService;
    private view: TodoView;

    constructor(view: TodoView, service: TodoService) {
        this.service = service;
        this.view = view;

        this.view.bindSubmitForm(this.handleAddTodo);
    }

    handleAddTodo = (text: ModelTodo) => {
        this.service.addTodo(text);
    }
}