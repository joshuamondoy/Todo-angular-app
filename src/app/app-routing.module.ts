import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { RouteGuardService } from './service/route-guard.service';

const routes: Routes = [
  {path: "", redirectTo: 'login', pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "welcome/:username", component: WelcomeComponent, canActivate: [RouteGuardService]}, //only activate when the routeguard returns true
  {path: "todo-list", component: TodoListComponent,  canActivate: [RouteGuardService]},
  {path: "logout", component: LogoutComponent,  canActivate: [RouteGuardService]},
  {path: "**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
