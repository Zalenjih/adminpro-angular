import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario.model';

// Ruta de sercivios del Backend
import { URL_SERVICIOS } from '../../config/config';


// Realizar peticiones http
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  urlGoogle = URL_SERVICIOS + '/login/google';
  urlUsuario = URL_SERVICIOS + '/usuario';
  urlLogin = URL_SERVICIOS + '/login';

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private _http: HttpClient, private router: Router) {
    this.cargarLocalStorage();
   }

  // ==============================================================
  // Verificar si el usuario está logueado
  // ==============================================================
  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  // ==============================================================
  // Guardar datos en el localStorage
  // ==============================================================
  guardarLocalStorage (id: string, token: string, usuario: Usuario) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));

        this.usuario = usuario;
        this.token = token;
  }

  // ==============================================================
  // Cargar datos del localStorage
  // ==============================================================
  cargarLocalStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  // ==============================================================
  // Login normal
  // ==============================================================
  login(usuario: Usuario, recordar: boolean = false) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    return this._http.post(this.urlLogin, usuario, {headers: this.headers}).pipe(

      map( (resp: any) => {
        this.guardarLocalStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  // ==============================================================
  // Login y/o registro con Google
  // ==============================================================
  loginGoogle(token: string) {
    return this._http.post(this.urlGoogle, {token}, {headers: this.headers}).pipe(
      map( (resp: any) => {
        this.guardarLocalStorage( resp.id, resp.token, resp.usuario);
        return true;
      })
    );
  }

  // ==============================================================
  // Logout
  // ==============================================================
  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  // ==============================================================
  // Registro de usuario
  // ==============================================================
   crearUsuario(usuario: Usuario) {
     return this._http.post(this.urlUsuario, usuario, {headers: this.headers})
     .pipe(
      map( (res: any) => {
        swal('Usuario creado', usuario.email, 'success');
        return res.usuario;
       })
     );
   }
}
