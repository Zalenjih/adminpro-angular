import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagen: File;
  imagenTemp: string;

  constructor(
    private _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
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

subirImagen() {
  this._subirArchivoService.subirArchivo(this.imagen, this._modalUploadService.tipo, this._modalUploadService.id)
  .then( resp => {
    console.log(resp);
    this._modalUploadService.notificacion.emit(resp);
    this.cerrarModal();
  })
  .catch( error => console.log('Error en la carga'));
}

cerrarModal() {
  this.imagenTemp = null;
  this.imagen = null;
  this._modalUploadService.ocultarModal();
}

}
