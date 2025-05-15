import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';   // Importa el módulo Button
import { ToolbarModule } from 'primeng/toolbar'; // Importa el módulo Toolbar
import { Router, RouterModule } from '@angular/router';  // Importa el RouterModule
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { Usuario } from '../interfaces/usuario';
import { UsuarioService } from '../servicios/usuario.service';

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
export class DashboardComponent implements OnInit {
  isSidebarVisible = true;
  usuario: Usuario | null = null;

  productos = [
    {
      nombre: 'Productos de Belleza',
      imagen: 'assets/belleza2.jpg',
      descripcion: 'Contamos con productos de belleza'
    },
    {
      nombre: 'Productos deportivos',
      imagen: 'assets/deportes.jpg',
      descripcion: 'Contamos con productos deportivos'
    },
    {
      nombre: 'Productos tecnológicos',
      imagen: 'assets/tec.jpg',
      descripcion: 'Contámos con tecnología'
    }
  ];

  constructor(private router: Router,private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.usuarioService.getUsuarioPorId(+id).subscribe({
        next: (data) => {
          this.usuario = data;
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
        }
      });
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}