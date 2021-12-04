import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
// isUserLoggedIn: boolean = false;
username: string = '';
  constructor(private activatedRoute: ActivatedRoute, 
              public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.username = this.activatedRoute.snapshot.params['username'];
    // this.isUserLoggedIn = this.authenticationService.isUserLogedIn();

  }

}
