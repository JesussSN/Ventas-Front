import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  login(credentials: { correoElectronico: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
 }


  getUsuarioPorId(id: number) {
    return this.http.get<Usuario>(`http://localhost:8080/api/usuarios/${id}`);
  }

  actualizarUsuario(id: number, usuario: Usuario) {
    return this.http.put<Usuario>(`http://localhost:8080/api/usuarios/${id}`, usuario);
  }


}
