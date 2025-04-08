import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  template: `
    <div class="dialog-container">
      <h2>{{ isEdit ? 'Edit' : 'Add' }} Employee</h2>
      <mat-stepper [linear]="true" #stepper>
        <!-- Personal Information Step -->
        <mat-step [stepControl]="personalInfoForm">
          <form [formGroup]="personalInfoForm">
            <ng-template matStepLabel>Personal Information</ng-template>
            
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>First Name</mat-label>
                <input matInput formControlName="firstName" required>
                <mat-error *ngIf="personalInfoForm.get('firstName')?.hasError('required')">
                  First name is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Last Name</mat-label>
                <input matInput formControlName="lastName" required>
                <mat-error *ngIf="personalInfoForm.get('lastName')?.hasError('required')">
                  Last name is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Email</mat-label>
                <input matInput formControlName="email" type="email" required>
                <mat-error *ngIf="personalInfoForm.get('email')?.hasError('required')">
                  Email is required
                </mat-error>
                <mat-error *ngIf="personalInfoForm.get('email')?.hasError('email')">
                  Please enter a valid email
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Phone</mat-label>
                <input matInput formControlName="phone" required>
                <mat-error *ngIf="personalInfoForm.get('phone')?.hasError('required')">
                  Phone number is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="button-row">
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>

        <!-- Employment Details Step -->
        <mat-step [stepControl]="employmentForm">
          <form [formGroup]="employmentForm">
            <ng-template matStepLabel>Employment Details</ng-template>
            
            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Role</mat-label>
                <input matInput formControlName="role" required>
                <mat-error *ngIf="employmentForm.get('role')?.hasError('required')">
                  Role is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Department</mat-label>
                <mat-select formControlName="department" required>
                  <mat-option value="Engineering">Engineering</mat-option>
                  <mat-option value="Marketing">Marketing</mat-option>
                  <mat-option value="Sales">Sales</mat-option>
                  <mat-option value="HR">HR</mat-option>
                  <mat-option value="Finance">Finance</mat-option>
                </mat-select>
                <mat-error *ngIf="employmentForm.get('department')?.hasError('required')">
                  Department is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="form-row">
              <mat-form-field appearance="outline">
                <mat-label>Start Date</mat-label>
                <input matInput [matDatepicker]="startPicker" formControlName="startDate" required>
                <mat-datepicker-toggle matSuffix [for]="startPicker"></mat-datepicker-toggle>
                <mat-datepicker #startPicker></mat-datepicker>
                <mat-error *ngIf="employmentForm.get('startDate')?.hasError('required')">
                  Start date is required
                </mat-error>
              </mat-form-field>

              <mat-form-field appearance="outline">
                <mat-label>Salary</mat-label>
                <input matInput type="number" formControlName="salary" required>
                <mat-error *ngIf="employmentForm.get('salary')?.hasError('required')">
                  Salary is required
                </mat-error>
              </mat-form-field>
            </div>

            <div class="button-row">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-button matStepperNext>Next</button>
            </div>
          </form>
        </mat-step>

        <!-- Review Step -->
        <mat-step>
          <ng-template matStepLabel>Review</ng-template>
          <div class="review-content">
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {{personalInfoForm.get('firstName')?.value}} {{personalInfoForm.get('lastName')?.value}}</p>
            <p><strong>Email:</strong> {{personalInfoForm.get('email')?.value}}</p>
            <p><strong>Phone:</strong> {{personalInfoForm.get('phone')?.value}}</p>

            <h3>Employment Details</h3>
            <p><strong>Role:</strong> {{employmentForm.get('role')?.value}}</p>
            <p><strong>Department:</strong> {{employmentForm.get('department')?.value}}</p>
            <p><strong>Start Date:</strong> {{employmentForm.get('startDate')?.value | date}}</p>
            <p><strong>Salary:</strong> {{employmentForm.get('salary')?.value | currency}}</p>
          </div>

          <div class="button-row">
            <button mat-button matStepperPrevious>Back</button>
            <button mat-raised-button color="primary" (click)="save()">
              {{ isEdit ? 'Update' : 'Add' }} Employee
            </button>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      margin: 0 0 24px;
      color: rgba(0, 0, 0, 0.87);
    }

    .form-row {
      display: flex;
      gap: 16px;
      margin-bottom: 16px;
    }

    mat-form-field {
      flex: 1;
    }

    .button-row {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 24px;
    }

    .review-content {
      margin: 24px 0;
    }

    .review-content h3 {
      color: rgba(0, 0, 0, 0.87);
      margin: 16px 0 8px;
    }

    .review-content p {
      margin: 8px 0;
      color: rgba(0, 0, 0, 0.87);
    }

    @media (max-width: 599px) {
      .dialog-container {
        padding: 16px;
      }

      .form-row {
        flex-direction: column;
        gap: 0;
      }
    }
  `]
})
export class EmployeeDialogComponent implements OnInit {
  personalInfoForm: FormGroup;
  employmentForm: FormGroup;
  isEdit = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Employee | undefined
  ) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });

    this.employmentForm = this.fb.group({
      role: ['', Validators.required],
      department: ['', Validators.required],
      startDate: ['', Validators.required],
      salary: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.data) {
      this.isEdit = true;
      const names = this.data.name.split(' ');
      this.personalInfoForm.patchValue({
        firstName: names[0],
        lastName: names.slice(1).join(' '),
        email: this.data.email,
        phone: this.data.phone
      });
      this.employmentForm.patchValue({
        role: this.data.role,
        department: this.data.department,
        startDate: this.data.startDate,
        salary: this.data.salary
      });
    }
  }

  save() {
    if (this.personalInfoForm.valid && this.employmentForm.valid) {
      const employeeData: Employee = {
        name: `${this.personalInfoForm.get('firstName')?.value} ${this.personalInfoForm.get('lastName')?.value}`,
        email: this.personalInfoForm.get('email')?.value,
        phone: this.personalInfoForm.get('phone')?.value,
        role: this.employmentForm.get('role')?.value,
        department: this.employmentForm.get('department')?.value,
        startDate: this.employmentForm.get('startDate')?.value,
        salary: this.employmentForm.get('salary')?.value,
        status: 'active'
      };

      this.dialogRef.close(employeeData);
    }
  }
}
