/**
 * 
 * @Class Model
 */

export interface todo {
    // id: string;
    text: string;
    categoria: string;
    complete: boolean;
}

export class ModelTodo {
    public id: string;
    public text: string;
    public complete: boolean;
    public categoria: string;

    constructor({ text, categoria, complete = false }: todo = {
        text: '',
        categoria: '',
        complete: false
        
    }) {
        this.id = this.generateId();
        this.text = text;
        this.categoria = categoria;
        this.complete = complete;
    }

    generateId(): string {
        return Math.random().toString();
    }
}