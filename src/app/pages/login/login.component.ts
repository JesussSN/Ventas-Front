import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { Router } from '@angular/router';
import { UsuarioService } from '../../servicios/usuario.service';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,DialogModule, FormsModule, InputTextModule, PasswordModule, ButtonModule, CardModule,ToastModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  correoElectronico = '';
  password = '';

  constructor(private router: Router,private usuarioService: UsuarioService, private messageService: MessageService) {}

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
 
  mostrarDialogoRecuperacion: boolean = false;
  correoRecuperacion: string = '';

  forgotPassword() {
    this.mostrarDialogoRecuperacion = true;
  }

  enviarRecuperacion() {

  this.usuarioService.obtenerPorCorreo(this.correoRecuperacion).subscribe({
    next: (usuario) => {
      this.messageService.add({severity:'success', summary:'Éxito', detail:'Correo validado correctamente', life: 3000});
      setTimeout(() => {
      this.router.navigate(['/restablecer'], {
      queryParams: { correo: this.correoRecuperacion }
      });
      }, 1500);
    },
    error: (err) => {
      if (err.status === 404) {
        alert('El correo no está registrado.');
      } else {
        alert('Error al validar el correo.');
      }
    }
  });
}

}
