import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UsuarioService } from '../../servicios/usuario.service';
import { Usuario } from '../../interfaces/usuario';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ToolbarModule,
    FormsModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    InputTextareaModule,
    PasswordModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  usuario: Usuario = {
    nombre: '',
    correo_electronico: '',
    telefono: '',
    direccion: '',
    password: ''
  };

  nuevaPassword: string = '';
  repetirPassword: string = '';
  passwordsNoCoinciden: boolean = false;

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    const id = localStorage.getItem('usuarioId');
    console.log('ID recuperado del localStorage:', id);
    if (id) {
      this.usuarioService.getUsuarioPorId(+id).subscribe({
        next: (data) => {
          this.usuario = data;
          console.log('Datos del usuario recibidos:', data);
        },
        error: (err) => {
          console.error('Error al cargar usuario:', err);
        }
      });
    }
  }

  guardarCambios() {
    if (this.nuevaPassword || this.repetirPassword) {
      if (this.nuevaPassword !== this.repetirPassword) {
        this.passwordsNoCoinciden = true;
        return;
      }
      this.usuario.password = this.nuevaPassword;
    }

    this.passwordsNoCoinciden = false;

    const id = localStorage.getItem('usuarioId');
    if (id) {
      this.usuarioService.actualizarUsuario(+id, this.usuario).subscribe({
        next: () => {
          alert('Perfil actualizado correctamente');
          this.nuevaPassword = '';
          this.repetirPassword = '';
        },
        error: (err) => {
          alert('Error al actualizar perfil');
          console.error(err);
        }
      });
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    this.router.navigate(['/login']);
  }

  soloNumeros(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  validarPassword(password: string): boolean {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return regex.test(password);
  }

}
