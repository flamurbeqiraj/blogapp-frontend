import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) {
    this.registerForm = this.formBuilder.group({
      fullname: [null, [Validators.minLength(10), Validators.maxLength(30)]],
      username: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.pattern(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i), Validators.maxLength(30)]],
      password: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
      confirmPassword: [null, [Validators.required]],
    }, {
      validators: this.matchValue
    });
  }

  formHasError(error: string) {
    return !!this.registerForm.hasError(error);
  }

  isTouched(field: string) {
    return this.registerForm.get(field)?.touched;
  }

  hasErrors(field: string) {
    return this.registerForm.get(field)?.errors;
  }

  hasError(field: string, error: string) {
    return !!this.registerForm.get(field)?.hasError(error);
  }

  matchValue: any = (fg: FormGroup<any>) => {
    const password = fg.get('password')?.value;
    const confirmPassword = fg.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { isMatching: true };
  }

  onSubmit() {
    let applicationUserCreate: any = {
      username: this.registerForm.get("username")?.value,
      password: this.registerForm.get("password")?.value,
      email: this.registerForm.get("email")?.value,
      fullname: this.registerForm.get("fullname")?.value
    }

    this.accountService.register(applicationUserCreate).subscribe(() => {
      this.router.navigate(['/dashboard']);
    })
  }
}