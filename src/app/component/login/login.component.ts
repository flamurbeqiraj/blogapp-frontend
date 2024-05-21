import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
    this.loginForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]]
    })
  }

  isTouched(field: string) {
    return this.loginForm.get(field)?.touched;
  }

  hasErrors(field: string) {
    return this.loginForm.get(field)?.errors;
  }

  hasError(field: string, error: string) {
    return !!this.loginForm.get(field)?.hasError(error);
  }

  onSubmit() {
    let applicationUserLogin: any = {
      username: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    };

    this.accountService.login(applicationUserLogin).subscribe((response: any) => {
    //   this.router.navigate(['/dashboard']);
    });
  }
}
