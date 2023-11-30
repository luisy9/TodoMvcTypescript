/**
 * 
 * Class Service
 */
import { ModelTodo, todo } from '../models/todo.models';
export class TodoService {
    public todos: ModelTodo[];
    private onListChanged: Function;
    constructor() {
        const todos: todo[] = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos = todos.map(e => new ModelTodo(e));
    }

    bindListChange(handle: Function) {
        this.onListChanged = handle;
    }

    _commit(todos: todo[]) {
        this.onListChanged(todos);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addTodo(text: todo) {
        this.todos.push(new ModelTodo(text));
        this._commit(this.todos);
    }

    deleteTodo(_id: string) {
        this.todos = this.todos.filter(e => e.id != _id);
        this._commit(this.todos);
    }

    updateTodos(_id: string) {

    }

    toggleTodos(id: string) {
        this.todos = this.todos.map(e => {
            if (e.id === id) {
                return new ModelTodo({ ...e, complete: !e.complete })
            }
            return e;
        });
        this._commit(this.todos);
    }
}