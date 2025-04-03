import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  constructor() {
    // Load employees from localStorage if available
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      this.employees = JSON.parse(storedEmployees).map((emp: any) => ({
        ...emp,
        joinDate: new Date(emp.joinDate)
      }));
      this.employeesSubject.next(this.employees);
    }
  }

  getEmployees(): Observable<Employee[]> {
    return this.employeesSubject.asObservable();
  }

  addEmployee(employee: Omit<Employee, 'id'>): Observable<Employee> {
    const newEmployee: Employee = {
      ...employee,
      id: Date.now().toString()
    };
    
    this.employees.push(newEmployee);
    this.updateStorage();
    return of(newEmployee);
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { ...this.employees[index], ...employee };
      this.updateStorage();
      return of(this.employees[index]);
    }
    throw new Error('Employee not found');
  }

  deleteEmployee(id: string): Observable<void> {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      this.updateStorage();
      return of(void 0);
    }
    throw new Error('Employee not found');
  }

  private updateStorage(): void {
    localStorage.setItem('employees', JSON.stringify(this.employees));
    this.employeesSubject.next(this.employees);
  }
} 