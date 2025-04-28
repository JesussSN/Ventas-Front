import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';  // Importar RouterModule
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-layout',
  standalone: true,  // Marcar como componente standalone
  imports: [RouterModule,ToolbarModule, ButtonModule,CommonModule    ],  // Importar RouterModule para las rutas
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isSidebarVisible = true;

  constructor( private router: Router) {}

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  logout() {
    this.router.navigate(['/login']);  // Redirigir al login
  }
}
