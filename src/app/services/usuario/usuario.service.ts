import { Injectable } from '@angular/core';
import { Usuario } from '../../model/usuario.model';

// Ruta de sercivios del Backend
import { URL_SERVICIOS } from '../../config/config';


// Realizar peticiones http
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subirArchivos/subir-archivo.service';

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

  constructor(private _http: HttpClient,
    private router: Router,
    private _subirArchivoService: SubirArchivoService) {
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

  // ==============================================================
  // Actualizar usuario
  // ==============================================================
  actualizarUsuario(usuario: Usuario) {
    let url = this.urlUsuario + '/' + usuario._id;
    url += '?token=' + this.token;

    return this._http.put(url, usuario, {headers: this.headers}).pipe(
      map( (resp: any) => {
        const usuarioDB = resp.usuario;
        this.guardarLocalStorage(usuarioDB._id, this.token, usuarioDB);
        swal('Usuario actualizado', usuario.nombre, 'success');
        return true;
      })
    );
  }



  // ==============================================================
  // Cambiar imagen (se conecta con el servicio de cambio de imagen)
  // ==============================================================
cambiarImagen( archivo: File, id: string) {
  this._subirArchivoService.subirArchivo ( archivo, 'usuarios', id )
  .then( (resp: any) => {
    console.log(resp);
    this.usuario.img = resp.usuarioActualizado.img;
    swal('Imagen actualizada', this.usuario.nombre, 'success');
    this.guardarLocalStorage(id, this.token, this.usuario);
  })
  .catch( resp => console.log(resp));
}







}
