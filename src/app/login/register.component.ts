import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../model/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;
  constructor( private _usuarioService: UsuarioService, private router: Router) {}


  ngOnInit() {
    init_plugins();

    // Variables del formuario y condiciones
    this.formulario = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email]),
        contraseña: new FormControl(null, Validators.required),
        contraseña2: new FormControl(null, Validators.required),
        condiciones: new FormControl(false)
      },
      { validators: this.sonIguales('contraseña', 'contraseña2') }
    );

    // Rellenar el formuladrio automáticamente
    this.formulario.setValue({
      nombre: 'test',
      correo: 'test@test.com',
      contraseña: '123456',
      contraseña2: '123456',
      condiciones: false
    });
  }

  // Condición que comprueba si ambas contraseñas son iguales
  sonIguales(campo1: string, campo2: string) {
    return (group: FormGroup) => {
      const password = group.controls[campo1].value;
      const password2 = group.controls[campo2].value;

      if (password === password2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  // Método que se ejecuta al aceptar con el botón de registro
  registrarUsuario() {

    if (this.formulario.invalid) {
      return;
    }

    if (!this.formulario.value.condiciones) {
      swal('Advertencia', 'Debe de aceptar las condiciones', 'warning');
      return;
    }

    console.log(this.formulario.value);

    const usuario = new Usuario (
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.contraseña
    );

    this._usuarioService.crearUsuario(usuario).subscribe( res => this.router.navigate(['/login']));
  }
}
