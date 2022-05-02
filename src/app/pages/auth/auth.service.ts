import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

import { UserResponse, User } from '@shared/models/user.interface';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
    //   this.checkToken();
  }

  get  isLogged() : Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<UserResponse | void> {
    const body = new HttpParams()
      .set('username', authData.username)
      .set('password', authData.password);

    return this.http
      .post<UserResponse>(`${environment.api_url}/login`, body.toString(), {
        headers: new HttpHeaders().set(
          'Content-Type',
          'application/x-www-form-urlencoded'
        ),
      })
      .pipe(
        map((res: UserResponse) => {
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res;
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  // private checkToken() {
  //   const userToken = localStorage.getItem('token');
  //   const isExpired = helper.isTokenExpired(userToken || '');
  //   console.log('isExpired -> ', isExpired);

  //   isExpired ? this.logout() : this.loggedIn.next(true);
  // }

  private saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  private handleError(err: any): Observable<never> {
    let errorMessage = 'An error occurred';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }

    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
