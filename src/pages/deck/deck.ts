import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Card, Field_Status } from '../../model/AppModel';
import { CalcProvider } from '../../providers/calc/calc';


/**
 * Generated class for the DeckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deck',
  templateUrl: 'deck.html',
})
export class DeckPage {

  field_status: Field_Status = new Field_Status

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private calc: CalcProvider,
  ) {
  }

  ionViewDidLoad() {

    // とりあえず初期デッキを作る

    const douka: Card = {
      name: '銅貨',
      money_point: 1,
      action_point: 1,
      draw_num: 0
    }

    const yashiki: Card = {
      name: '屋敷',
      money_point: 0,
      action_point: 0,
      draw_num: 0
    }

    Array(7).fill('').map((val) => {
      this.field_status.deck.push(douka)
    })

    Array(3).fill('').map((val) => {
      this.field_status.deck.push(yashiki)
    })

    this.field_status = this.calc.follow_turn(this.field_status)

  }



}
