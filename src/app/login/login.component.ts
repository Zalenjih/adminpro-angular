import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Usuario } from '../model/usuario.model';
import { element } from 'protractor';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: String;
  recuerdame: Boolean = false;

  // GOOGLE
  auth2: any;

  constructor(private router: Router, private _usuarioService: UsuarioService) { }

  ngOnInit() {
    // Carga los plugins personalizados
    init_plugins();
    // Google
    this.googleInit();

    // Si el valor que obtiene es UNDEFINED le dará un string vacío
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }


  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '897553055337-1549kp91tc8dtd498fpgeo1dpq9f5gj8.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  attachSignin(element: any) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      /* const profile = googleUser.getBasicProfile(); */
      const token = googleUser.getAuthResponse().id_token;
      // Login o registro con nuestro backend
      // La forma de enrutar es solo en caso de problemas con el template o plugins
      this._usuarioService.loginGoogle(token).subscribe( () => window.location.href = '#/dashboard');
    });
  }

  ingresar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const usuario = new Usuario(null, form.value.email, form.value.password);

    this._usuarioService.login(usuario, form.value.recuerdame).subscribe( logued => this.router.navigate(['/dashboard']));
    /* this.router.navigate(['/dashboard']); */
  }

}

