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
      <h2 class="dialog-title">Add Employee Details</h2>
      
      <form [formGroup]="employeeForm" (ngSubmit)="onSubmit()">
        <div class="form-field-container">
          <label class="field-label">Employee name*</label>
          <mat-form-field appearance="outline">
            <input matInput formControlName="name" placeholder="Enter employee name">
            <mat-icon matPrefix>person</mat-icon>
            <mat-error *ngIf="employeeForm.get('name')?.hasError('required')">
              Employee name is required
            </mat-error>
          </mat-form-field>
        </div>

        <div class="form-field-container">
          <label class="field-label">Select role*</label>
          <mat-form-field appearance="outline">
            <mat-select formControlName="role" placeholder="Select role">
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
        </div>

        <div class="date-fields">
          <div class="date-field">
            <mat-icon class="calendar-icon" (click)="startPicker.open()">calendar_today</mat-icon>
            <div class="date-input" (click)="startPicker.open()">
              <span>{{ employeeForm.get('startDate')?.value | date }}</span>
            </div>
          </div>
          <span class="arrow">→</span>
          <div class="date-field">
            <mat-icon class="calendar-icon" (click)="endPicker.open()">calendar_today</mat-icon>
            <div class="date-input" (click)="endPicker.open()">
              <span>{{ employeeForm.get('endDate')?.value ? (employeeForm.get('endDate')?.value | date) : 'No date' }}</span>
            </div>
          </div>
          <mat-datepicker #startPicker (closed)="onDatePickerClosed()"></mat-datepicker>
          <mat-datepicker #endPicker (closed)="onDatePickerClosed()"></mat-datepicker>
          <input hidden [matDatepicker]="startPicker" formControlName="startDate">
          <input hidden [matDatepicker]="endPicker" formControlName="endDate">
        </div>

        <div class="dialog-actions">
          <button mat-button type="button" (click)="onCancel()" class="cancel-button">Cancel</button>
          <button mat-flat-button color="primary" type="submit" [disabled]="employeeForm.invalid" class="save-button">
            Save
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 0;
      width: 100%;
      box-sizing: border-box;
      background-color: white;
      border-radius: 8px;
      overflow: hidden;
    }

    .dialog-title {
      margin: 0;
      padding: 16px 24px;
      color: white;
      font-size: 20px;
      font-weight: 400;
      background-color: #2196f3;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      padding: 16px 24px 24px;
    }

    .form-field-container {
      display: flex;
      flex-direction: column;
    }

    .field-label {
      font-size: 14px;
      color: #444;
      margin-bottom: 6px;
      font-weight: 500;
    }

    mat-form-field {
      width: 100%;
    }

    .date-fields {
      display: flex;
      align-items: center;
      gap: 16px;
      margin: 12px 0;
    }

    .date-field {
      flex: 1;
      display: flex;
      align-items: center;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      padding: 12px 16px;
      background-color: #f5f5f5;
    }

    .calendar-icon {
      color: #2196f3;
      margin-right: 12px;
      font-size: 18px;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .calendar-icon:hover {
      transform: scale(1.1);
    }

    .date-input {
      flex: 1;
      cursor: pointer;
      color: #333;
    }

    .arrow {
      color: #2196f3;
      font-size: 20px;
      margin: 0 4px;
    }

    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: 16px;
    }

    .save-button {
      background-color: #2196f3;
      padding: 0 24px;
    }

    .cancel-button {
      color: #2196f3;
    }

    ::ng-deep {
      .mat-mdc-form-field {
        display: block;
      }

      .mat-mdc-form-field-appearance-outline .mat-mdc-form-field-wrapper {
        margin: 0;
        padding: 0;
      }

      .mat-mdc-form-field-appearance-outline .mat-mdc-form-field-infix {
        padding: 12px 0;
      }

      .mat-mdc-text-field-wrapper {
        background-color: #f5f5f5;
        border: 1px solid #e0e0e0;
        border-radius: 4px !important;
      }

      .mat-mdc-form-field-flex {
        align-items: center;
      }

      .mat-mdc-form-field-outline {
        display: none;
      }

      .mat-mdc-form-field-icon-prefix {
        padding-left: 12px;
        padding-right: 8px;
        color: #2196f3;
      }

      .mat-mdc-form-field-icon-prefix > .mat-icon {
        color: #2196f3;
      }

      .mat-calendar {
        border-radius: 8px;
      }

      .mat-calendar-header {
        background-color: white;
        color: black;
      }

      .mat-calendar-body-selected {
        background-color: #2196f3;
        border-radius: 50%;
      }

      .mat-calendar-body-today {
        border: 1px solid #2196f3;
        border-radius: 50%;
      }

      .mat-calendar-table-header {
        color: rgba(0, 0, 0, 0.6);
      }

      .mat-calendar-body-cell-content {
        border-radius: 50%;
      }
      
      .mat-datepicker-toggle {
        color: #2196f3;
      }

      .mat-calendar-body-disabled > .mat-calendar-body-cell-content {
        color: rgba(0, 0, 0, 0.38);
      }

      .mat-datepicker-content {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }

      .mat-calendar-controls {
        margin: 4% 0;
      }

      .mat-calendar-arrow {
        border-top-color: rgba(0, 0, 0, 0.54);
      }

      .mat-datepicker-actions {
        padding: 8px;
        border-top: 1px solid #f0f0f0;
      }

      .mat-datepicker-content .mat-calendar {
        width: 296px;
        height: auto;
      }
    }

    @media (max-width: 600px) {
      .dialog-container {
        padding: 0;
      }

      .date-fields {
        flex-direction: column;
        gap: 12px;
      }

      .arrow {
        display: none;
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

  onDatePickerClosed(): void {
    // This method is called when the date picker is closed
    // You can add logic here if needed
  }
} 