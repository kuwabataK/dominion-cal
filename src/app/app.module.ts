import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CalcProvider } from '../providers/calc/calc';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatExpansionModule,MatFormFieldModule,MatRippleModule,MatInputModule,MatButtonModule} from '@angular/material';
import { MainPage } from '../pages/main/main';
import { DeckPage } from '../pages/deck/deck';
import { SupplyPage } from '../pages/supply/supply';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MainPage,
    DeckPage,
    SupplyPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatRippleModule,
    MatInputModule,
    MatButtonModule,
    // MatAccordion
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MainPage,
    DeckPage,
    SupplyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CalcProvider
  ]
})
export class AppModule {}
