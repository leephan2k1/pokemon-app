import { Component, OnInit } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginComponentComponent } from '../login-component/login-component.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-nav-auth',
  standalone: true,
  imports: [NzModalModule, LoginComponentComponent],
  templateUrl: './nav-auth.component.html',
  styleUrl: './nav-auth.component.scss',
})
export class NavAuthComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}

  openFormAuthByType: 'signIn' | 'signUp' | null = null;
  isVisible = false;
  isAuth = false;

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => {
      if (user && user.id) {
        this.isAuth = true;
      } else {
        this.isAuth = false;
      }
    });
  }

  handleSignOut() {
    this.authService.logout();
  }

  handleLoginSuccess() {
    this.isVisible = false;
    this.openFormAuthByType = null;
  }

  openAuthForm(type: 'signIn' | 'signUp') {
    this.openFormAuthByType = type;
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  handleOk(): void {
    this.isVisible = false;
  }
}
