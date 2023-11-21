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

        this.service.bindListChange(this.handleDisplay);
        this.view.bindSubmitForm(this.handleAddTodo);
    }

    handleDisplay = (todos: todo[]) => {
        this.view.displayTodo(todos);
    }

    handleAddTodo = (text: ModelTodo) => {
        this.service.addTodo(text);
    }
}