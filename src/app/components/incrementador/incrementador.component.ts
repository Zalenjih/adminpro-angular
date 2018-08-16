import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { element } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: String = 'Leyenda';
  @Input() progreso: Number = 50;

  @Output() cambioValor: EventEmitter<Number> = new EventEmitter();

  constructor() {
    /* console.log('Leyenda: ', this.leyenda ); */
    /* console.log('Progreso: ', this.progreso); */
  }

  ngOnInit() {
    /* console.log('Leyenda: ', this.leyenda ); */
    /* console.log('Progreso: ', this.progreso); */
  }

  onChange(newValue: Number) {

    /* let elemHTML: any = document.getElementsByName('progreso')[0]; */


    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = newValue;
    }

    /* elemHTML.value = Number (this.progreso); */
    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit(this.progreso);
  }

  cambiarValor(valor) {

    if (this.progreso >= 100 && valor > 0) {
      this.progreso = 100;
      return;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.progreso = 0;
      return;
    }
    this.progreso = this.progreso + valor;

    this.cambioValor.emit(this.progreso);

    this.txtProgress.nativeElement.focus();
  }

}
