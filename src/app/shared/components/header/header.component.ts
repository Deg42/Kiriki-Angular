import { AuthService } from '@auth/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isAdmin = false;
  @Output() toggleSidenav = new EventEmitter<void>();
  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {}

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  onLogout() {
    this.authSvc.logout();
  }
}
