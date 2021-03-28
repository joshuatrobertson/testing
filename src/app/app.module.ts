import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RestartGameComponent} from './restart-game/restart-game.component';
import {MatDialogModule} from '@angular/material/dialog';
import {GameCardComponent} from './game-card/game-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RestartGameComponent,
    GameCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
