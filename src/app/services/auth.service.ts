import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isBrowser: boolean;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      const storedUser = localStorage.getItem('currentUser');
      if (storedUser) {
        this.currentUserSubject.next(JSON.parse(storedUser));
      }
    }
  }

  signUp(data: SignUpData): Observable<AuthResponse> {
    if (this.isBrowser) {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const existingUser = users.find((u: any) => u.email === data.email);
      
      if (existingUser) {
        return throwError(() => new Error('User with this email already exists'));
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password // In real app, this should be hashed
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      const response: AuthResponse = {
        token: 'dummy-token-' + Date.now(),
        user: {
          id: newUser.id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email
        }
      };

      this.handleAuthentication(response);
      return of(response);
    }
    return throwError(() => new Error('Browser storage not available'));
  }

  signIn(data: SignInData): Observable<AuthResponse> {
    if (this.isBrowser) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => 
        u.email === data.email && u.password === data.password
      );

      if (!user) {
        return throwError(() => new Error('Invalid email or password'));
      }

      const response: AuthResponse = {
        token: 'dummy-token-' + Date.now(),
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }
      };

      this.handleAuthentication(response);
      return of(response);
    }
    return throwError(() => new Error('Browser storage not available'));
  }

  signOut(): void {
    if (this.isBrowser) {
      localStorage.removeItem('currentUser');
    }
    this.currentUserSubject.next(null);
  }

  private handleAuthentication(response: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('currentUser', JSON.stringify(response));
    }
    this.currentUserSubject.next(response);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = error.error?.message || `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
