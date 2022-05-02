import { AuthService } from '@auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    const userData = {
      username: 'user',
      password: 'pass'
    }
    this.authSvc.login(userData).subscribe(res => console.log('Login'));
  }

}
