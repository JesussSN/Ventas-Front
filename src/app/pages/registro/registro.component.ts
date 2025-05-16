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

  registrarUsuario() {
    
    if (this.password !== this.repetirPassword) {
      this.passwordsNoCoinciden = true;
      return;
    }

    if (!this.validarPassword(this.password)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Contraseña inválida',
        detail: 'La contraseña debe tener al menos una mayúscula, una minúscula y un número.'
      });
      return;
    }

    if (!this.validarCorreo(this.correo_electronico)) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Correo inválido',
        detail: 'Ingrese un correo electrónico válido.'
      });
      return;
    }

    this.passwordsNoCoinciden = false;

    const usuario: Usuario = {
      nombre: this.nombre,
      correo_electronico: this.correo_electronico,
      telefono: this.telefono,
      direccion: this.direccion,
      password: this.password
    };

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
        const mensaje = err.error?.mensaje || 'Ocurrió un error al registrar el usuario.';
        this.messageService.add({
          severity: 'error',
          summary: 'Error de registro',
          detail: mensaje
        });
      }
    });
  }

  volverAlLogin() {
    this.router.navigate(['/login']);
  }

  validarTelefono(event: any) {
    const input = event.target.value;
    this.telefono = input.replace(/[^0-9]/g, '');
  }
  
  permitirSoloNumeros(event: KeyboardEvent): void {
    const charCode = event.key.charCodeAt(0);
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validarCorreo(correo: string): boolean {
    const regexCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexCorreo.test(correo);
  }

  convertirAMayusculas(): void {
   this.nombre = this.nombre.toUpperCase().replace(/[^A-Z ]/g, '');
  }

  validarPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return regex.test(password);
  }
}
