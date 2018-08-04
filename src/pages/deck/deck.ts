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
  deck_length: number = 0
  total_money = 0
  avarage_money: number = 0
  max_money: number = 0
  min_money = 0

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

    this.deck_length = this.field_status.deck.length

    const f_a = Array(100).fill('').map(() => {
      return this.calc.follow_turn(this.field_status)
    })

    let total_money = 0
    const mp_a = f_a.map((val) => {
      total_money += val.money_point
      return val.money_point
    })
    this.avarage_money = total_money / 100
    this.max_money = Math.max(...mp_a)
    this.min_money = Math.min(...mp_a)

  }

  calc_money(count: number){

    const f_a = Array(count).fill('').map(() => {
      return this.calc.follow_turn(this.field_status)
    })

    let total_money = 0
    const mp_a = f_a.map((val) => {
      total_money += val.money_point
      return val.money_point
    })
    this.avarage_money = total_money / count
    this.max_money = Math.max(...mp_a)
    this.min_money = Math.min(...mp_a)

  }



}
