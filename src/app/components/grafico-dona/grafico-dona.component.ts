import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input() doughnutChartLabels: String[] = [];
  @Input() doughnutChartData: Number[] = [];
  @Input() doughnutChartType: String = '';


  constructor() { }

  ngOnInit() {
  }

  // events
  /* public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  } */

}
