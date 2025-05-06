import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';   // Importa el módulo Button
import { ToolbarModule } from 'primeng/toolbar'; // Importa el módulo Toolbar
import { Router, RouterModule } from '@angular/router';  // Importa el RouterModule
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    ButtonModule,
    ToolbarModule,
    RouterModule,
    CommonModule,
    CarouselModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  isSidebarVisible = true;

  productos = [
    {
      nombre: 'Productos de Belleza',
      imagen: 'assets/belleza.jpg',
      descripcion: 'Contamos con productos de belleza'
    },
    {
      nombre: 'Productos deportivos',
      imagen: 'assets/deportes.jpg',
      descripcion: 'Contamos con productos deportivos'
    },
    {
      nombre: 'Productos tecnologicos',
      imagen: 'assets/tec.jpg',
      descripcion: 'Contamos con tecnologia'
    }
  ];

  constructor(private router: Router) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}