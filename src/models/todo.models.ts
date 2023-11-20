/**
 * 
 * @Class Model
 */

export interface todo {
    text: string,
    complete?: boolean
}

export class ModelTodo {
    public id: string;
    public text: string;
    public complete?: boolean;

    constructor({ text, complete }: todo = {
        text: '',
        complete: false
    }) {
        this.id = this.generateId();
        this.text = text;
        this.complete = complete;
    }

    generateId(): string {
        return Math.random().toString();
    }
}