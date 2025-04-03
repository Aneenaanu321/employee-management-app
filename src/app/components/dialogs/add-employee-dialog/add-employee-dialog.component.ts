import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  template: `
    <div class="dialog-container">
      <h2>Add Employee Details</h2>
      
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline">
          <mat-label>Employee name</mat-label>
          <input matInput formControlName="name" placeholder="Enter employee name">
          <mat-icon matPrefix>person</mat-icon>
          <mat-error *ngIf="employeeForm.get('name')?.hasError('required')">
            Employee name is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Select role</mat-label>
          <mat-select formControlName="role">
            <mat-option value="product_designer">Product Designer</mat-option>
            <mat-option value="flutter_developer">Flutter Developer</mat-option>
            <mat-option value="qa_tester">QA Tester</mat-option>
            <mat-option value="product_owner">Product Owner</mat-option>
          </mat-select>
          <mat-icon matPrefix>work</mat-icon>
          <mat-error *ngIf="employeeForm.get('role')?.hasError('required')">
            Role is required
          </mat-error>
        </mat-form-field>

        <div class="date-fields">
          <mat-form-field appearance="outline">
            <mat-label>Start Date</mat-label>
            <input matInput [matDatepicker]="startPicker" formControlName="startDate">
            <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
            <mat-datepicker #startPicker></mat-datepicker>
            <mat-icon matPrefix>event</mat-icon>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>End Date</mat-label>
            <input matInput [matDatepicker]="endPicker" formControlName="endDate">
            <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
            <mat-datepicker #endPicker></mat-datepicker>
            <mat-icon matPrefix>event</mat-icon>
          </mat-form-field>
        </div>

        <div class="dialog-actions">
          <button mat-button type="button" (click)="onCancel()">Cancel</button>
          <button mat-flat-button color="primary" type="submit" [disabled]="employeeForm.invalid">
            Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      max-width: 500px;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
    }

    h2 {
      margin: 0 0 24px;
      color: #1976d2;
      font-size: 24px;
      font-weight: 400;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    mat-form-field {
      width: 100%;
    }

    .date-fields {
      display: flex;
      gap: 16px;
      
      mat-form-field {
        flex: 1;
      }
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 8px;
    }

    mat-icon {
      color: #666;
    }

    ::ng-deep {
      .mat-mdc-form-field-icon-prefix {
        padding-right: 8px;
      }
      
      .mat-mdc-text-field-wrapper {
        background-color: #f8f9fa;
      }
    }

    @media (max-width: 600px) {
      .dialog-container {
        padding: 16px;
      }

      .date-fields {
        flex-direction: column;
        gap: 0;
      }
    }
  `]
})
export class AddEmployeeDialogComponent {
  employeeForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddEmployeeDialogComponent>,
    private fb: FormBuilder
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      startDate: [new Date()],
      endDate: [null]
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 