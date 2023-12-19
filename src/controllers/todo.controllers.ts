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

        this.service.bindListChange(this.onListChanged);
        this.view.bindSubmitForm(this.handleAddTodo);
        this.view.bindDeleteTodo(this.handleDeleteTodo);
        this.view.bindUpdateTodos(this.handleUpdateList);
        // this.view.bindTodoChecked(this.handleCheckTodo);

        this.onListChanged(this.service.todos);
    }

    onListChanged = (todos: ModelTodo[]) => {
        this.view.displayTodo(todos);
    }

    handleAddTodo = (text: todo, categoria: todo) => {
        this.service.addTodo(text, categoria);
    }

    handleDeleteTodo = (_id: string) => {
        this.service.deleteTodo(_id);
    }

    handleUpdateList = (_id: number, todo: string) => {
        this.service.updateTodos(_id, todo);
    }

    // handleCheckTodo = (id: string) => {
    //     this.service.toggleTodos(id);
    // }
}