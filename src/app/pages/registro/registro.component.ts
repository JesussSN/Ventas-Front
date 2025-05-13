import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ToastModule
  ],
  providers: [UsuarioService, MessageService],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre: string = '';
  correo_electronico: string = '';
  telefono: string = '';
  direccion: string = '';
  password: string = '';
  repetirPassword: string = '';
  passwordsNoCoinciden: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService, private messageService: MessageService) {}

  // Método para registrar el usuario
  registrarUsuario() {
    // Validar si las contraseñas coinciden
    if (this.password !== this.repetirPassword) {
      this.passwordsNoCoinciden = true;
      return;
    }

    // Restablecer la variable de error en caso de que las contraseñas coincidan
    this.passwordsNoCoinciden = false;

    // Crear el objeto usuario con los datos del formulario
    const usuario: Usuario = {
      nombre: this.nombre,
      correo_electronico: this.correo_electronico,
      telefono: this.telefono,
      direccion: this.direccion,
      password: this.password
    };
    console.log('Usuario a enviar:', usuario);

    // Llamar al servicio para crear el usuario
    this.usuarioService.crearUsuario(usuario).subscribe({
      next: () => {
        this.messageService.add({
        severity: 'success',
        summary: 'Registro exitoso',
        detail: 'Usuario creado correctamente'
        });
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        console.error('Error al registrar usuario:', err);
        const mensaje = err.error?.mensaje || 'Ocurrió un error al registrar el usuario.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error de registro',
          detail: mensaje
        });
      }
    });
  }

  validarTelefono(event: any) {
    const input = event.target.value;
    this.telefono = input.replace(/[^0-9]/g, '');
  }

}
