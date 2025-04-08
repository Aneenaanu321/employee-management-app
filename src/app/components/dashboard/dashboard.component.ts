import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeDialogComponent } from '../employee/employee-dialog/employee-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatMenuModule,
    MatTooltipModule
  ],
  template: `
    <div class="dashboard-container">
      <div class="header">
        <h1>Employee Dashboard</h1>
        <button mat-fab extended color="primary" (click)="openAddEmployeeDialog()" class="add-button">
          <mat-icon>add</mat-icon> Add Employee
        </button>
      </div>

      <div class="employee-grid">
        <mat-card class="employee-card" *ngFor="let employee of employees; trackBy: trackEmployeeById">
          <mat-card-header>
            <div mat-card-avatar class="employee-avatar" [style.backgroundColor]="getAvatarColor(employee.name)">
              {{ getInitials(employee.name) }}
            </div>
            <mat-card-title>{{ employee.name }}</mat-card-title>
            <mat-card-subtitle>{{ employee.role }}</mat-card-subtitle>
            <button mat-icon-button [matMenuTriggerFor]="menu" class="more-button">
              <mat-icon>more_vert</mat-icon>
            </button>
            <mat-menu #menu="matMenu">
              <button mat-menu-item (click)="editEmployee(employee)">
                <mat-icon>edit</mat-icon>
                <span>Edit</span>
              </button>
              <button mat-menu-item (click)="deleteEmployee(employee)">
                <mat-icon color="warn">delete</mat-icon>
                <span>Delete</span>
              </button>
            </mat-menu>
          </mat-card-header>
          <mat-divider></mat-divider>
          <mat-card-content>
            <div class="employee-details">
              <p>
                <mat-icon>calendar_today</mat-icon>
                <span>Start Date: {{ employee.startDate | date:'mediumDate' }}</span>
              </p>
              <p *ngIf="employee.endDate">
                <mat-icon>event_busy</mat-icon>
                <span>End Date: {{ employee.endDate | date:'mediumDate' }}</span>
              </p>
              <p>
                <mat-icon>phone</mat-icon>
                <span>{{ employee.phone || 'No phone number' }}</span>
              </p>
              <p>
                <mat-icon>email</mat-icon>
                <span>{{ employee.email || 'No email' }}</span>
              </p>
            </div>
          </mat-card-content>
        </mat-card>

        <!-- Empty state when no employees -->
        <div class="empty-state" *ngIf="!employees?.length">
          <mat-icon>people_outline</mat-icon>
          <h2>No Employees Yet</h2>
          <p>Click the Add Employee button to get started</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
      flex-wrap: wrap;
      gap: 16px;
    }

    h1 {
      margin: 0;
      font-size: 24px;
    }

    .employee-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      padding: 8px;
    }

    .employee-card {
      border-radius: 8px;
      transition: transform 0.2s;
    }

    .employee-card:hover {
      transform: translateY(-2px);
    }

    .employee-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 500;
      font-size: 18px;
    }

    .more-button {
      position: absolute;
      right: 8px;
      top: 8px;
    }

    .employee-details {
      padding: 16px;
    }

    .employee-details p {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 8px 0;
      color: rgba(0, 0, 0, 0.87);
    }

    .employee-details mat-icon {
      color: rgba(0, 0, 0, 0.54);
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 48px 16px;
      background: #f5f5f5;
      border-radius: 8px;
    }

    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      color: rgba(0, 0, 0, 0.38);
    }

    .empty-state h2 {
      margin: 16px 0 8px;
      color: rgba(0, 0, 0, 0.87);
    }

    .empty-state p {
      margin: 0;
      color: rgba(0, 0, 0, 0.54);
    }

    @media (max-width: 599px) {
      .header {
        flex-direction: column;
        align-items: stretch;
      }

      .add-button {
        width: 100%;
      }

      .employee-grid {
        grid-template-columns: 1fr;
      }
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .employee-list {
      display: grid;
      gap: 16px;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }

    .employee-card {
      display: flex;
      justify-content: space-between;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .employee-info {
      flex: 1;

      h3 {
        margin: 0 0 8px;
      }

      p {
        margin: 4px 0;
        color: #666;
      }
    }

    .actions {
      display: flex;
      align-items: flex-start;
      gap: 8px;
    }

    @media (max-width: 600px) {
      .dashboard-container {
        padding: 16px;
      }

      .employee-list {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  
  getInitials(name: string): string {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = [
      '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2',
      '#c2185b', '#0288d1', '#00796b', '#ffa000'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  }

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees: Employee[]) => {
        this.employees = employees;
      },
      error: (error) => {
        console.error('Error loading employees:', error);
      }
    });
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

  editEmployee(employee: Employee) {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '100%',
      maxWidth: '800px',
      disableClose: true,
      data: employee
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.updateEmployee(employee.id!, result).subscribe({
          next: () => {
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error updating employee:', error);
          }
        });
      }
    });
  }

  openAddEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '100%',
      maxWidth: '800px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.employeeService.addEmployee(result).subscribe({
          next: () => {
            this.loadEmployees();
          },
          error: (error) => {
            console.error('Error adding employee:', error);
          }
        });
      }
    });
  }

  trackEmployeeById(index: number, employee: Employee) {
    return employee.id;
  }
}
