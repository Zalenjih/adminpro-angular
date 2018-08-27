import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  page: string;

  constructor(private router: Router, private pageTitle: Title, private meta: Meta) {

    this.getDataRoute()
    .subscribe( data => {
      this.page = data.titulo;
      this.pageTitle.setTitle( this.page );

      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.page
      };

      this.meta.updateTag(metaTag);
    });
   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( (eventos) => eventos instanceof ActivationEnd),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null),
      map((evento: ActivationEnd) => evento.snapshot.data)
    );
  }

}
