import { Component, OnInit, OnDestroy} from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  public observer: Number;
  subscription: Subscription;
  constructor() {

    this.subscription = this.regresaObservable()
    .subscribe(
      numero => {
        console.log('Subs ', numero);
        this.observer = numero;
      },
      errorObs => console.error('Error en el obs', errorObs),
      () => console.log('El observador terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable((observer: Subscriber<any> ) => {

      let contador = 0;

      const intervalo = setInterval(() => {
        contador ++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        /* if (contador === 3) {
          clearInterval(intervalo);
          observer.complete();
        } */

        /* if (contador === 2) {
          /* clearInterval(intervalo);
          observer.error('Auxilio');
        } */


      }, 1000);
    }).pipe(
      // Map indica la manera en que los datos pasan
      map(resp => {
        return resp.valor;
      }),
      // Filter indica cuales datos pasan y cuales no
      filter( (valor, index) => {
        if ((valor % 2) === 1) {
          return true;
        } else {
          return false;
        }
      }),
    );
  }

}
