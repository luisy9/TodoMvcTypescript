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

    addTodo(text: todo, categoria: todo) {
        this.todos.push(new ModelTodo(text));
        this._commit(this.todos);
    }


    // deleteTodo(_id: string) {
    //     this.todos = this.todos.filter(e => e.id != _id);
    //     this._commit(this.todos);
    // }

    // updateTodos(id: number, todo: string) {
    //     const _id = id.toString();
    //     this.todos = this.todos.map(e => {
    //         if (e.id === _id) {
    //             return new ModelTodo({ ...e, text: todo });
    //         }
    //         return e;
    //     })
    //     this._commit(this.todos);
    // }

    // toggleTodos(id: string) {
    //     this.todos = this.todos.map(e =>
    //         e.id === id ?
    //             new ModelTodo({ ...e, complete: !e.complete }) :
    //             e
    //     );
    //     this._commit(this.todos);
    // }
}