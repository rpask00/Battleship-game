import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { BatllefieldComponent } from './battlefield/battlefield.component';
import { SingleFieldComponent } from './battlefield/player-area/single-field/single-field.component';
import { PlayerAreaComponent } from './battlefield/player-area/player-area.component';
import { EnemyAreaComponent } from './battlefield/enemy-area/enemy-area.component';
import { InvitePopUpComponent } from './splash-screen/invite-pop-up/invite-pop-up.component';
import { EnemyFieldComponent } from './battlefield/enemy-area/enemy-field/enemy-field.component';
import { GameOverPopupComponent } from './game-over-popup/game-over-popup.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    BatllefieldComponent,
    SingleFieldComponent,
    PlayerAreaComponent,
    EnemyAreaComponent,
    InvitePopUpComponent,
    EnemyFieldComponent,
    GameOverPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IonicModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
