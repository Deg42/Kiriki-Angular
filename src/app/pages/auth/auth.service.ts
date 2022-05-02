import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { UserResponse, User } from '@shared/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(authData: User): Observable<UserResponse | void> {
    const body = new HttpParams()
    .set('username', authData.username)
    .set('password', authData.password);

    return this.http
      .post<UserResponse>(`${environment.api_url}/login`, body.toString(),
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      })
      .pipe(
        map((res: UserResponse) => {
          console.log('Res->', res);
          //saveToken
        }),
        catchError((err) => this.handleError(err))
      );
  }

  logout() {}
  private readToken() {}
  private saveToken() {}
  private handleError(err: any): Observable<never> {

    let errorMessage = 'An error occurred';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }

    window.alert(errorMessage);
    return throwError(() => errorMessage);
  }
}
