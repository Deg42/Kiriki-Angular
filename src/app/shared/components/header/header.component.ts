import { Subscription } from 'rxjs';
import { AuthService } from '@auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {
  isAdmin = false;
  isLogged = false;

  private suscription: Subscription = new Subscription();;

  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private authSvc: AuthService) {}


  ngOnInit(): void {
    this.suscription.add(
      this.authSvc.isLogged.subscribe((res) => (this.isLogged = res))
    );
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe();
  }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authSvc.logout();
  }
}
