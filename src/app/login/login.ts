import {LoginService} from './login.service';
import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {ToastService} from '../toast/toast.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router, private toastService: ToastService) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    const formData = this.loginForm.value;

    this.loginService.login(formData).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.message);
        this.toastService.openSnackBarSuccess('Login successful!');
        this.router.navigate(['/search']);
      },
      error: (error) => {
        this.toastService.openSnackBar('Login successful!');
      }
    })
  }
}
