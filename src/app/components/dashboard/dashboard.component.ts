import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { AddEmployeeDialogComponent } from '../dialogs/add-employee-dialog/add-employee-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    RouterModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  displayedColumns: string[] = ['name', 'email', 'position', 'department', 'joinDate', 'status', 'actions'];

  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
    });
  }

  addEmployee(): void {
    const dialogRef = this.dialog.open(AddEmployeeDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'add-employee-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the new employee data
        this.employeeService.addEmployee(result).subscribe(() => {
          this.loadEmployees();
        });
      }
    });
  }

  editEmployee(employee: Employee): void {
    // We'll implement this later with a dialog
    console.log('Edit employee clicked', employee);
  }

  deleteEmployee(employee: Employee): void {
    if (confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      this.employeeService.deleteEmployee(employee.id).subscribe(() => {
        this.loadEmployees();
      });
    }
  }

  signOut(): void {
    this.authService.signOut();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }
}
