import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="employee-list">
      <mat-card class="employee-card" *ngFor="let employee of employees; trackBy: trackEmployeeById">
        <mat-card-header>
          <mat-card-title>{{ employee.name }}</mat-card-title>
          <mat-card-subtitle>{{ employee.role }}</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p><mat-icon>calendar_today</mat-icon> Start Date: {{ employee.startDate | date }}</p>
          <ng-container *ngIf="employee.endDate">
            <p><mat-icon>calendar_today</mat-icon> End Date: {{ employee.endDate | date }}</p>
          </ng-container>
          <p><mat-icon>info</mat-icon> Status: {{ employee.status }}</p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button color="primary" (click)="editEmployee(employee)">
            <mat-icon>edit</mat-icon> Edit
          </button>
          <button mat-button color="warn" (click)="deleteEmployee(employee)">
            <mat-icon>delete</mat-icon> Delete
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .employee-list {
      padding: 20px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    .employee-card {
      mat-card-content {
        p {
          display: flex;
          align-items: center;
          gap: 8px;
          margin: 8px 0;

          mat-icon {
            font-size: 18px;
            width: 18px;
            height: 18px;
          }
        }
      }

      mat-card-actions {
        display: flex;
        justify-content: flex-end;
        padding: 8px;
      }
    }
  `]
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
  }

  editEmployee(employee: Employee) {
    this.router.navigate(['/edit', employee.id]);
  }

  deleteEmployee(employee: Employee) {
    if (employee.id === undefined) return;
    
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employee.id).subscribe({
        next: () => {
          this.loadEmployees();
        },
        error: (error) => {
          console.error('Error deleting employee:', error);
        }
      });
    }
  }

  trackEmployeeById(index: number, employee: Employee) {
    return employee.id;
  }
}