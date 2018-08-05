import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Card, Field_Status } from '../../model/AppModel';
import { CalcProvider } from '../../providers/calc/calc';
import { StorageProvider } from '../../providers/storage/storage';


/**
 * Generated class for the DeckPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-deck',
  templateUrl: 'deck.html',
})
export class DeckPage {

  panelOpenState = false;

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
    private storage:StorageProvider,
  ) {
  }

  async ionViewDidLoad() {
    this.field_status = await this.storage.get_field_status()
    this.calc_money(100)
  }
  async ionViewWillEnter(){
    this.field_status = await this.storage.get_field_status()
  }


  calc_money(count: number) {

    console.log(this.field_status)
    const f_a = Array(count).fill('').map(() => {
      return this.calc.follow_turn(this.field_status)
    })
    console.log(f_a)

    let total_money = 0
    const mp_a = f_a.map((val) => {
      total_money += val.money_point
      return val.money_point
    })
    console.log(mp_a)
    this.deck_length = this.field_status.deck.length
    this.avarage_money = total_money / count
    this.max_money = Math.max(...mp_a)
    this.min_money = Math.min(...mp_a)

  }

}
