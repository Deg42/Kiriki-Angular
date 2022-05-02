import { AuthService } from '@auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CheckLoginGuard implements CanActivate {
  constructor(private authSvc: AuthService) {}
  canActivate(): Observable<boolean> {
    console.log(this.authSvc.isLogged);
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged : boolean) => !isLogged)
    );
  }
}
