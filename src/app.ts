import { TodoController } from "./controllers/todo.controllers";
import { TodoService } from "./services/todo.service";
import { TodoView } from "./views/todo.views";



export const app = new TodoController(new TodoView(), new TodoService());