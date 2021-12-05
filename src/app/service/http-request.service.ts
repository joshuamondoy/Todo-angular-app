import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { API_URL } from '../app.constants';
import { Todo } from '../components/todo-model/todo.model';

@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {
  startedEditing = new Subject<Todo>();
  private _refreshNeeded = new Subject<void>();
  
  get refreshNeeded(){
    return this._refreshNeeded;
  }

  constructor(private httpClient: HttpClient) { }

  createAutHttpHeader() {
    let username = 'admin';
    let password = 'admin';
    let basicAutHeaderString = 'Basic ' + window.btoa(username + ':' + password);
    return basicAutHeaderString;
  }
  getTodos(){
    return this.httpClient.get<Todo>(API_URL  + '/todo-list');
  }
  getHelloWorldMessage(username: string){
    // let basicAutHeaderString = this.createAutHttpHeader();
    // let headers = new HttpHeaders({
    //   Authorization: basicAutHeaderString
    // })
    return this.httpClient.get<Todo>(API_URL  + '/todo-list/' + username
      // {headers}
      )
  }

  getAllTodos(username: string){
    return this.httpClient.get<Todo[]>(`${API_URL}/users/${username}/todo-list`);
  }
  deleteTodo(id: number, username: string){
    return this.httpClient.delete(`${API_URL}/users/${username}/todo-list/${id}`)
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  addTodo(todo: Todo, username: string){
    return this.httpClient.post(`${API_URL}/users/${username}/todo-list`, todo)
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  updateTodo(todo: Todo, username: string, id: number){
    return this.httpClient.put(`${API_URL}/users/${username}/todo-list/${id}`, todo)
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
  getTodo(id: number, username: string){
    return this.httpClient.get<Todo>(`${API_URL}/users/${username}/todo-list/${id}`)
    .pipe(
      tap(() => {
        this._refreshNeeded.next();
      })
    );
  }
 
 
  
}
