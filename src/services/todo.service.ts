/**
 * 
 * Class Service
 */
import { ModelTodo, todo } from '../models/todo.models';
export class TodoService {
    public todos: todo[];
    constructor() {
        const todos: todo[] = JSON.parse(localStorage.getItem('todos')) || [];
        this.todos = todos.map(e => new ModelTodo(e));
    }

    _commit(todos: todo[]){
       localStorage.setItem('todos', JSON.stringify(todos));
       this.bindListChange();
    }

    bindListChange(handle: Function = () => {}){
        console.log('bindListChange');
        handle(this.todos);
    }

    addTodo(text: ModelTodo) {
        this.todos.push(new ModelTodo(text));
        this._commit(this.todos);
    }
}