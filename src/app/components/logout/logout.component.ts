import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Todo } from '../todo-model/todo.model';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  @Input() todo: Todo[] = [];
  constructor(private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.authentication.logout()
    console.log(this.todo);
    
  }

}
