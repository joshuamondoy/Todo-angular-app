import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BasicAuthenticationService } from 'src/app/service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
validCredentials: boolean = false;
errMsg: string = 'Incorrect username or password';
  constructor(private router: Router,
              private authenticateService: AuthenticationService,
              private basicAuthenticationService: BasicAuthenticationService) { }

  ngOnInit(): void {
  }
  // onLogin(form: NgForm) {
  //   const formValue = form.value;
  //   if(this.basicAuthenticationService.authenticate(formValue.username, formValue.password)){
  //   this.router.navigate(['welcome', formValue.username])
  //   this.validCredentials = false;
  // } else {
  //   this.validCredentials = true;
  // }
  
  // TO VALIDATE COMMENT OUT THE provide: HTTP_INTERCEPTORS IN APP.MODULE.TS
  //USERNAME AND PASSWORD IS THE ONE YOU SET IN THE APPLICATION.PROPERTIES IN API
  handleBasicAuthLogin(form: NgForm) {
    const formValue = form.value;
    this.basicAuthenticationService.executeAuthenticationService(formValue.username, formValue.password)
    .subscribe(
      data => {
        console.log(data);
        this.router.navigate(['welcome', formValue.username])
        this.validCredentials = false
        
      },
      error => {
        console.log(error);
        this.validCredentials = true
      }
    )
    
  }

}
