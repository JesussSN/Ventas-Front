import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { UsuarioService } from '../servicios/usuario.service';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule,ToolbarModule, ButtonModule,CommonModule    ], 
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit{
  isSidebarVisible = true;
  usuario: Usuario | null = null;

  constructor( private router: Router,private usuarioService: UsuarioService) {}

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
    this.router.navigate(['/login']);
  }
}
