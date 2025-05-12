import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  nombre: string = '';
  correoElectronico: string = '';
  telefono: string = '';
  direccion: string = '';
  password: string = '';
  repetirPassword: string = '';
  passwordsNoCoinciden: boolean = false;

  constructor(private router: Router) {}

  registrarUsuario() {
    if (this.password !== this.repetirPassword) {
      this.passwordsNoCoinciden = true;
      return;
    }

    this.passwordsNoCoinciden = false;

    const usuario = {
      nombre: this.nombre,
      correoElectronico: this.correoElectronico,
      telefono: this.telefono,
      direccion: this.direccion,
      password: this.password
    };

    console.log('Registrando usuario:', usuario);

    // Aquí puedes integrar tu servicio para enviar los datos al backend
    // this.usuarioService.registrar(usuario).subscribe(() => {
    //   this.router.navigate(['/login']);
    // });

    this.router.navigate(['/login']); // Navega al login después del registro (simulación)
  }
}
