import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { StartGameComponent } from './components/start-game/start-game.component';
import { ShowLogsComponent } from './components/show-logs/show-logs.component';
import { GameboardComponent } from './components/gameboard/gameboard.component';
import { AttemptComponent } from './components/attempt/attempt.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpInterceptor} from "./interceptors/http.interceptor";
import { RequestFilterPipe } from './pipes/request-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    StartGameComponent,
    ShowLogsComponent,
    GameboardComponent,
    AttemptComponent,
    RequestFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
