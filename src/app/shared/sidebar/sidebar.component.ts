import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';
import { Usuario } from '../../model/usuario.model';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menus: any = [];
  usuario: Usuario;

  constructor(public _sidebar: SidebarService, private _usuarioService: UsuarioService) {
    this.menus = _sidebar.menu;
   }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  logout() {
    this._usuarioService.logout();
  }

}
