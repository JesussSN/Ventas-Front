import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';   // Importa el módulo Button
import { ToolbarModule } from 'primeng/toolbar'; // Importa el módulo Toolbar
import { Router, RouterModule } from '@angular/router';  // Importa el RouterModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    RouterModule,
    CommonModule 
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
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
