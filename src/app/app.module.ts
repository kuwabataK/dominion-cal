import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { CalcProvider } from '../providers/calc/calc';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionModule, MatFormFieldModule, MatRippleModule, MatInputModule, MatButtonModule } from '@angular/material';
import { MainPage } from '../pages/main/main';
import { DeckPage } from '../pages/deck/deck';
import { SupplyPage } from '../pages/supply/supply';
import { StorageProvider } from '../providers/storage/storage';
import { UtilProvider } from '../providers/util/util';
@NgModule({
  declarations: [
    MyApp,
    MainPage,
    DeckPage,
    SupplyPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
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
    MainPage,
    DeckPage,
    SupplyPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CalcProvider,
    DeckPage,
    StorageProvider,
    UtilProvider,

  ]
})
export class AppModule { }
