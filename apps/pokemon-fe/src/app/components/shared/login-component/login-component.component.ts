import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-component.component.html',
  styleUrl: './login-component.component.scss',
})
export class LoginComponentComponent {
  constructor(private readonly authService: AuthService) {}

  userName = '';
  password = '';
  repeatPassword = '';
  errorMessage = '';
  isFetching = false;

  @Input() openFormAuthByType: 'signIn' | 'signUp' | null = null;

  @Output()
  emitLoginSuccess = new EventEmitter<void>();

  handleAuth() {
    this.handleSignUp();
    this.handleSignIn();
  }

  handleSignUp() {
    if (this.openFormAuthByType !== 'signUp') return;

    if (this.userName.length < 3) {
      this.errorMessage = 'User name must be greater than 3 characters';
    }

    if (this.password.length < 6) {
      this.errorMessage = 'Password must be greater than 3 characters';
    }

    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'repeat password must be equal password';
    }

    this.isFetching = true;
    this.authService.signUp(this.userName, this.password).subscribe(
      (res) => {},
      (err) => {
        console.error(err);
      },
      () => {
        this.isFetching = false;
        this.emitLoginSuccess.emit();
      },
    );
  }

  handleSignIn() {
    if (this.openFormAuthByType !== 'signIn') return;

    if (!this.userName || !this.password) {
      this.errorMessage = 'username or password must be fill';
      return;
    }

    this.isFetching = true;
    this.authService.login(this.userName, this.password).subscribe(
      (res) => {},
      (err) => {
        console.error(err);
      },
      () => {
        this.isFetching = false;
        this.emitLoginSuccess.emit();
      },
    );
  }

  handleClearError() {
    this.errorMessage = '';
  }
}
