import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { APIService } from './services/api.service';
import { CdkTableModule } from '@angular/cdk/table';
import { HttpClientModule } from '@angular/common/http';
import { AppMaterialModules } from './material.module';
import { DataCollectionComponent } from './data-table/data-table.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    CdkTableModule,
    HttpClientModule,
    AppMaterialModules],
  declarations: [AppComponent, HeaderComponent, DataCollectionComponent],
  bootstrap: [AppComponent],
  providers: [APIService]
})
export class AppModule { }