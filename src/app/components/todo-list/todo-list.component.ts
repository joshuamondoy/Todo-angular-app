import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo-model/todo.model';
import { HttpRequestService } from 'src/app/service/http-request.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  constructor(private httpRequestService: HttpRequestService){}
  username: string = 'admin';
  todoList: Todo[]= [];
  todo: Todo | undefined;
  errMsg: string = '';
  id: number = 0;
  description: string = '';
  done: boolean = false;
  date: string = '';
  ngOnInit(): void {
    
    this.httpRequestService.refreshNeeded
    .subscribe(() => {
      this.getAllDataFromAPI();
    });
    this.getAllDataFromAPI();
      
  }
  private getAllDataFromAPI() {
    this.httpRequestService.getAllTodos(this.username)
      .subscribe(data => this.todoList = data,
        error => {
          this.errMsg = error.error.message
        })
        
      
  }

  onDelete(id: number, username: string) {
    this.httpRequestService.deleteTodo(id, this.username)
      .subscribe(data => console.log("Deleted")
      )
    
  }

  onUpdate(todo: Todo) {
    this.httpRequestService.startedEditing.next(todo);
   
  }
 
  

}
