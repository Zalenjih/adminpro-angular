import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  // tslint:disable-next-line:no-inferrable-types
  desde: number = 0;
  totalRegistros: Number = 0;
  cargando: Boolean = true;

  constructor(private _usuarioService: UsuarioService, public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe(resp => this.cargarUsuarios());
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {

    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
      this.cargando = false;
    });
  }

  cambiarDesde(valor: number) {
    const desde = valor + this.desde;
    console.log(desde);

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: String) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
    }

    this.cargando = true;

    this._usuarioService.buscarUsuario(termino).subscribe( (usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario(usuario: Usuario) {
    console.log(usuario);

    if (usuario._id === this._usuarioService.usuario._id) {
      swal('No pudo borrar el usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }

    swal({
      title: '¿Estás seguro?',
      text: 'Está a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then(borrar => {

      console.log(borrar);

      if (borrar) {
        this._usuarioService.borrarUsuario(usuario._id)
        .subscribe( (borrado) => {
          console.log('Borrado: ' + borrado);
          this.desde = 0;
          this.cargarUsuarios();
        });
      }
    });
  }

  actualizarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario).subscribe();
  }

}
