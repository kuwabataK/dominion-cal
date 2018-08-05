import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DeckPage } from '../deck/deck';
import { SupplyPage } from '../supply/supply';


/**
 * Generated class for the MainPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {

  deckRoot = DeckPage
  supplyRoot = SupplyPage


  constructor(public navCtrl: NavController) {}

}
