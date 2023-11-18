import { TodoController } from "./src/controller/todo.controller";
import { TodoService } from "./src/service/todo.service";
import { TodoView } from "./src/views/todo.view";



const app = new TodoController(new TodoView(), new TodoService());