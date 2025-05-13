import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  correoElectronico = '';
  password = '';

  constructor(private router: Router,private usuarioService: UsuarioService) {}

  login() {
    this.usuarioService.login({ correoElectronico: this.correoElectronico, password: this.password })
      .subscribe({
        next: (usuario) => {
         // localStorage.setItem('usuario', JSON.stringify(usuario));
         // localStorage.setItem('token', 'usuario-logeado');
          localStorage.setItem('usuarioId', usuario.id);
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          alert('Usuario o contraseña incorrectos.');
        }
      });
  }

  register(){
    this.router.navigate(['/registro']);
  }
  
  forgotPassword(){

  }
}
