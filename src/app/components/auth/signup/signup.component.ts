import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  errorMessage: string = '';

  passwordRequirements = {
    minLength: { met: false, text: 'At least 8 characters long' },
    hasUpperCase: { met: false, text: 'At least one uppercase letter' },
    hasLowerCase: { met: false, text: 'At least one lowercase letter' },
    hasNumber: { met: false, text: 'At least one number' },
    hasSpecialChar: { met: false, text: 'At least one special character' }
  };

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {}

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      formGroup.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      formGroup.get('confirmPassword')?.setErrors(null);
    }
  }

  private createPasswordStrengthValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) return null;

      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /\d/.test(value);
      const hasSpecialChar = /[@$!%*?&]/.test(value);
      const isLengthValid = value.length >= 8;

      const passwordValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;

      return !passwordValid ? { passwordStrength: true } : null;
    };
  }

  checkPasswordRequirements(password: string): void {
    this.passwordRequirements.minLength.met = password.length >= 8;
    this.passwordRequirements.hasUpperCase.met = /[A-Z]/.test(password);
    this.passwordRequirements.hasLowerCase.met = /[a-z]/.test(password);
    this.passwordRequirements.hasNumber.met = /\d/.test(password);
    this.passwordRequirements.hasSpecialChar.met = /[@$!%*?&]/.test(password);
  }

  shouldShowPasswordRequirements(): boolean {
    const passwordControl = this.signupForm.get('password');
    return Boolean(passwordControl?.dirty) && 
           Boolean(passwordControl?.value?.length > 0) &&
           !this.allPasswordRequirementsMet();
  }

  allPasswordRequirementsMet(): boolean {
    return Object.values(this.passwordRequirements).every(req => req.met);
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      try {
        const { firstName, lastName, email, password } = this.signupForm.value;
        await this.authService.signUp({
          firstName,
          lastName,
          email,
          password
        });
        this.router.navigate(['/signin']);
      } catch (error: any) {
        this.errorMessage = error.message || 'An error occurred during signup';
      }
    } else {
      this.markFormGroupTouched(this.signupForm);
      this.errorMessage = 'Please fix the errors in the form';
    }
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.signupForm.get('password');
    if (!passwordControl) return '';

    if (passwordControl.hasError('required')) {
      return 'Password is required';
    }
    if (passwordControl.hasError('minlength')) {
      return 'Password must be at least 8 characters long';
    }
    if (passwordControl.hasError('passwordStrength')) {
      return 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character';
    }
    return '';
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
