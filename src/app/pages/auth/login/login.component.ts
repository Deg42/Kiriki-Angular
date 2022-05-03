import { AuthService } from '@auth/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private isValidUsername = /^[a-zA-Z0-9]{3,20}$/;
  private suscription: Subscription = new Subscription();

  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required, Validators.pattern(this.isValidUsername)],
    ],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onLogin() {
    const formValue = this.loginForm.value;

    this.suscription.add(
      this.authSvc.login(formValue).subscribe((res) => {
        if (res) {
          this.router.navigate(['']);
        }
      })
    );
  }

  getErrorMessage(field: string) {
    let message;

    if (this.loginForm.get(field)?.errors?.required) {
      message = 'Campo obligatorio';
    } else if (this.loginForm.get(field)?.hasError('pattern')) {
      message = 'No es un nombre de usuario válido';
    } else if (this.loginForm.get(field)?.hasError('minlength')) {
      const minLength =
        this.loginForm.get(field)?.errors?.minlength.requiredLength;
      message = `Mínimo ${minLength} caractereres`;
    }
    return message;
  }

  isValidField(field: string) {
    return (
      (this.loginForm.get(field)?.touched ||
        this.loginForm.get(field)?.dirty) &&
      this.loginForm.get(field)?.invalid
    );
  }
}
