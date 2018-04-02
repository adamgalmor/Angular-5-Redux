import { Component } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { CounterActions } from './app.actions';
import { IAppState } from "./store";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
// export class AppComponent implements OnDestroy{ //*
  title = 'app';
  // count: number; //*
  readonly count$: Observable<number>; 
  subscription;

  constructor(
    private ngRedux: NgRedux<IAppState>, private actions: CounterActions) {
    // this.subscription = ngRedux.select<number>('count').subscribe(newCount => { //*
    //     this.count = newCount
    //   });
      this.count$ = ngRedux.select<number>('count'); //*
     }

    // ngOnDestroy() { //*
    //   this.subscription.unsubscribe();
    // }

    increment() {
      this.ngRedux.dispatch(this.actions.increment());
    }

    decrement() {
      this.ngRedux.dispatch(this.actions.decrement());
    }
}
