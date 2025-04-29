import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';  // Necesario para *ngIf
import { ToolbarModule } from 'primeng/toolbar'; // Para la barra de herramientas de PrimeNG
import { FormsModule } from '@angular/forms'; // Necesario para ngModel
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    CardModule ,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  // Definir el objeto usuario con las propiedades que se usan en el formulario
  usuario = {
    nombre: '',
    correo: '',
    telefono: '',
    direccion: ''
  };

  constructor(private router: Router) {}

  // Función para guardar los cambios en el perfil
  guardarCambios() {
    console.log('Cambios guardados:', this.usuario);
    // Aquí podrías agregar la lógica para enviar los datos al backend y guardar los cambios en la base de datos
  }

  // Función para cerrar sesión y redirigir al login
  logout() {
    localStorage.removeItem('token');  // Elimina el token de localStorage
    this.router.navigate(['/login']);   // Redirige a la página de login
  }
}
