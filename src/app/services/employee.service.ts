import { Injectable, signal } from '@angular/core';
import { IndexDBService } from './indexdb.service';
import { Employee } from '../models/employee.model';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeesSignal = signal<Employee[]>([]);

  constructor(private indexdbService: IndexDBService) {
    this.loadEmployees();
  }

  private async loadEmployees(): Promise<void> {
    const employees = await this.indexdbService.getAllEmployees();
    this.employeesSignal.set(employees);
  }

  getEmployees(): Observable<Employee[]> {
    return from(this.indexdbService.getAllEmployees()).pipe(
      tap((employees: Employee[]) => this.employeesSignal.set(employees))
    );
  }

  getEmployee(id: number): Observable<Employee | undefined> {
    return from(this.indexdbService.getEmployee(id));
  }

  addEmployee(employee: Employee): Observable<number> {
    return from(this.indexdbService.addEmployee(employee)).pipe(
      tap((id: number) => {
        const newEmployee = { ...employee, id };
        this.employeesSignal.update((employees: Employee[]) => [...employees, newEmployee]);
      })
    );
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    const updatedEmployee = { ...employee, id };
    return from(this.indexdbService.updateEmployee(updatedEmployee)).pipe(
      tap(() => {
        this.employeesSignal.update((employees: Employee[]) => 
          employees.map((e: Employee) => e.id === id ? updatedEmployee : e)
        );
      })
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return from(this.indexdbService.deleteEmployee(id)).pipe(
      tap(() => {
        this.employeesSignal.update((employees: Employee[]) => 
          employees.filter((e: Employee) => e.id !== id)
        );
      })
    );
  }

  get employees(): Employee[] {
    return this.employeesSignal();
  }
}