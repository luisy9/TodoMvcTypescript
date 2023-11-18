/**
 * 
 * Class TodoView
 */
import '../../styles.css';
export class TodoView {
    public root: HTMLElement;
    constructor() {
        this.root = this.createElement('div', 'div-app');
    }



    createElement(elemnt: string, className: string) {
        const newElement = document.createElement(elemnt);
        if (className) {
            newElement.classList.add(className);
        }
        return newElement;
    }
}