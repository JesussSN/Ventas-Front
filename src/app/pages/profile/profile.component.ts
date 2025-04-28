import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Necesario para *ngIf
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule    // Importa CommonModule para usar *ngIf
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  isSidebarVisible = true;

  constructor(private router: Router) {}

  // Función para alternar la visibilidad del sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  // Función para cerrar sesión y redirigir al login
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
