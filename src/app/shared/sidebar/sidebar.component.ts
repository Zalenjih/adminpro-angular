import { Component, OnInit } from '@angular/core';
import { SidebarService, UsuarioService } from '../../services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  menus: any = [];

  constructor(public _sidebar: SidebarService, private _usuarioService: UsuarioService) {
    this.menus = _sidebar.menu;
   }

  ngOnInit() {
  }

  logout() {
    this._usuarioService.logout();
  }

}
