import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidebarComponent, CommonModule],
  template: `
    <div class="app-container" [ngClass]="{'auth-layout': isAuthPage}">
      <app-navbar #navbar (sidebarToggle)="onSidebarToggle($event)" *ngIf="!isAuthPage"></app-navbar>
      <app-sidebar [(isOpen)]="isSidebarOpen" *ngIf="!isAuthPage"></app-sidebar>
      <main [ngClass]="{'main-content': !isAuthPage, 'auth-content': isAuthPage}">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      height: 100vh;
      background-color: white;
      overflow: hidden;
      position: relative;
    }

    .main-content {
      flex: 1;
      margin-top: 50px;
      transition: all 0.3s ease;
      overflow: hidden;
      width: 100%;
    }

    .auth-content {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    @media (max-width: 768px) {
      .main-content.sidebar-open {
        margin-left: 0;
      }
    }
  `]
})
export class AppComponent {
  @ViewChild('navbar') navbar!: NavbarComponent;
  isAuthPage: boolean = false;
  isSidebarOpen: boolean = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isAuthPage = ['/signin', '/signup'].includes(event.url);
      if (this.isAuthPage) {
        this.isSidebarOpen = false;
      }
    });
  }

  onSidebarToggle(isOpen: boolean): void {
    this.isSidebarOpen = isOpen;
  }
}
