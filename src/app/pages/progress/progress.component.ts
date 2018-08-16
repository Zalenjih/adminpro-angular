import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progreso1: Number = 20;
  progreso2: Number = 30;

  constructor() { }

  ngOnInit() {
  }



}
