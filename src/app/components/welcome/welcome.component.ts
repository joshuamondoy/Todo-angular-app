import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpRequestService } from 'src/app/service/http-request.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
username: string ='';
  constructor(private acitivatedRoute: ActivatedRoute, 
              private httpRequestservice: HttpRequestService) { }

  ngOnInit(): void {
    this.username = this.acitivatedRoute.snapshot.params['username'];
  }
  getHelloWorld() {
    this.httpRequestservice.getHelloWorldMessage(this.username)
      .subscribe(data => console.log(data)
      )
  }

}
