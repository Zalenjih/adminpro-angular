import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagen: File;
  imagenTemp: string;

  constructor(private _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
    .subscribe (resp => {
      console.log(resp);
    });
  }

  seleccionImagen(archivo: File) {
      if ( !archivo ) {
        this.imagen = null;
        return;
      }

      if ( archivo.type.indexOf('image') < 0) {
        swal('Solo se aceptan imágenes', 'El archivo seleccionado no es una imagen', 'error');
        console.log('pasa por la validación de imagen');
        this.imagen = null;
        return;
      }
      this.imagen = archivo;

      // Previsualización de la nueva imagen con Vanilla Javascript
      const reader = new FileReader();
      const urlImagenTemp = reader.readAsDataURL(archivo);
      reader.onloadend = () => this.imagenTemp = reader.result.toString();
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagen, this.usuario._id);
  }

}
