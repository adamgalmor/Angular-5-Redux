import { NgRedux, NgReduxModule, DevToolsExtension  } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store';
import { CounterActions } from './app.actions';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { APIService } from './services/api.service';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModules } from './material.module';
import { DataCollectionComponent } from './data-table/data-table.component';
import { HeaderComponent } from './header/header.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { DataComponent } from './data/data.component';

@NgModule({
  imports: [BrowserModule,
    AppRoutingModule,
    NgReduxModule,
    BrowserAnimationsModule,
    FormsModule,
    CdkTableModule,
    HttpClientModule,
    AppMaterialModules],
  declarations: [AppComponent, HeaderComponent, DataCollectionComponent, routingComponents],
  bootstrap: [AppComponent],
  providers: [APIService, CounterActions]
})
export class AppModule { 
  constructor(ngRedux: NgRedux<IAppState>, 
              devTools: DevToolsExtension //for the DevToolsExtension
    ) {
    const storeEnhancers = devTools.isEnabled() ? [devTools.enhancer()] : []; //for the DevToolsExtension

    // Tell @angular-redux/store about our rootReducer and our initial state.
    // It will use this to create a redux store for us and wire up all the
    // events.
    ngRedux.configureStore(
      rootReducer,
      INITIAL_STATE,
      [], storeEnhancers); //for the DevToolsExtension
  }
}