import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

  // tslint:disable-next-line:no-inferrable-types
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();

  constructor() { console.log('modal upload listo'); }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
    this.oculto = '';
    this.tipo = tipo;
    this.id = id;
  }
}
