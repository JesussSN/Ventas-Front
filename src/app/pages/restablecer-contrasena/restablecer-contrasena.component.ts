import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-restablecer-contrasena',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule
  ],
  templateUrl: './restablecer-contrasena.component.html',
  styleUrls: ['./restablecer-contrasena.component.scss']
})
export class RestablecerContrasenaComponent {

  correo: string = '';
  nuevaContrasena: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      this.correo = params['correo'] || '';
    });
  }

  enviarRestablecimiento() {
    const payload = {
      correo: this.correo,
      nuevaContrasena: this.nuevaContrasena
    };

  this.http.post('http://localhost:8080/api/correo/restablecer', payload)
    .subscribe({
      next: () => {
        alert('Contraseña restablecida exitosamente');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Error al restablecer contraseña');
      }
    });
  }

}
