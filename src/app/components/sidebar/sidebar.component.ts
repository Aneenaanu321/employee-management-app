import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatListModule
  ],
  template: `
    <div class="sidebar-overlay" [class.active]="isOpen" (click)="closeSidebar()"></div>
    <div class="sidebar" [class.sidebar-open]="isOpen">
      <div class="sidebar-header">
        Stock Portfolio Dashboard
      </div>
      <div class="sidebar-content">
        <a class="sidebar-item" routerLink="/dashboard" routerLinkActive="active">
          <mat-icon class="sidebar-icon">apps</mat-icon>
          <span>Dashboard</span>
        </a>
        <a class="sidebar-item" routerLink="/settings" routerLinkActive="active">
          <mat-icon class="sidebar-icon">settings</mat-icon>
          <span>Settings</span>
        </a>
        <a class="sidebar-item" routerLink="/help" routerLinkActive="active">
          <mat-icon class="sidebar-icon">help</mat-icon>
          <span>Help</span>
        </a>
        <a class="sidebar-item" routerLink="/about" routerLinkActive="active">
          <mat-icon class="sidebar-icon">info</mat-icon>
          <span>About</span>
        </a>
        <a class="sidebar-item" routerLink="/contact" routerLinkActive="active">
          <mat-icon class="sidebar-icon">help_outline</mat-icon>
          <span>Contact</span>
        </a>
        <div class="sidebar-divider"></div>
        <a class="sidebar-item" (click)="signOut()">
          <mat-icon class="sidebar-icon">logout</mat-icon>
          <span>Logout</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .sidebar-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;

      &.active {
        opacity: 1;
        visibility: visible;
      }
    }

    .sidebar {
      position: fixed;
      top: 0;
      left: -250px;
      width: 250px;
      height: 100vh;
      background-color: white;
      box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
      transition: left 0.3s ease;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    }

    .sidebar-open {
      left: 0;
    }

    .sidebar-header {
      height: 50px;
      background-color: #1976d2;
      color: white;
      display: flex;
      align-items: center;
      padding: 0 16px;
      font-size: 18px;
      font-weight: 400;
    }

    .sidebar-content {
      padding: 8px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      overflow-y: auto;
    }

    .sidebar-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      text-decoration: none;
      color: #333;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(0, 0, 0, 0.04);
      }

      &.active {
        background-color: #1976d2;
        color: white;

        .sidebar-icon {
          color: white;
        }
      }
    }

    .sidebar-icon {
      margin-right: 16px;
      color: #666;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .sidebar-divider {
      height: 1px;
      background-color: #e0e0e0;
      margin: 8px 0;
    }

    span {
      font-size: 14px;
    }
  `]
})
export class SidebarComponent {
  @Input() isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  closeSidebar(): void {
    this.isOpen = false;
  }

  async signOut(): Promise<void> {
    try {
      // Clear the auth state
      this.authService.signOut();
      
      // Navigate to signin page
      await this.router.navigate(['/signin']);
      
      // Reload the page to ensure clean state
      window.location.reload();
    } catch (error) {
      console.error('Error during sign out:', error);
      // Still try to navigate to signin even if there's an error
      this.router.navigate(['/signin']);
    }
  }
} 