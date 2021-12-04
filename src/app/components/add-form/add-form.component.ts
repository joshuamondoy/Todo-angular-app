import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpRequestService } from 'src/app/service/http-request.service';
import { Todo } from '../todo-model/todo.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-form',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
  providers: [DatePipe]
})
export class AddFormComponent implements OnInit {
  editedId: number = 0;
  username: string = 'admin';
  updateMode: boolean = false;
  toUpdateTodo: Todo;
  @ViewChild('formValues',{static: false}) todoForm: NgForm;

  constructor(private httpRequestService: HttpRequestService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.httpRequestService.startedEditing
    .subscribe((todo: Todo) => {
      this.updateMode = true;
      this.toUpdateTodo = todo
      this.editedId = this.toUpdateTodo.id
      this.todoForm.setValue({
        description: this.toUpdateTodo.description,
        date: this.datepipe.transform(this.toUpdateTodo.date, 'yyyy-MM-dd')

      })
    });
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newTodo = new Todo(0, 'admin', value.description, value.done, value.date)
    const updateTodo = new Todo(this.editedId, 'admin', value.description, value.done, value.date)
    
      if(!this.updateMode) {
        this.httpRequestService.addTodo(newTodo, newTodo.username)
        .subscribe()
      } else {
        this.httpRequestService.updateTodo(updateTodo, newTodo.username, this.toUpdateTodo.id)
        .subscribe();
        this.updateMode = false;
      }
      this.onClearFields();
  }
  onClearFields() {
    this.todoForm.resetForm();
    this.updateMode = false;
  }
  
}
