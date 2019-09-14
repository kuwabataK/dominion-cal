import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { Card, Field_Status } from '../../model/AppModel';
import { StorageProvider } from '../../providers/storage/storage';


/**
 * Generated class for the SupplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-supply',
  templateUrl: 'supply.html',
})
export class SupplyPage {

  supply: Card[] = []
  field_status: Field_Status = new Field_Status
  new_card: Card = new Card()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: StorageProvider,
  ) {
  }

  ionViewWillEnter() {
    this.init()
  }

  async init() {
    this.supply = await this.storage.get_supply()
    this.field_status = await this.storage.get_field_status()
  }

  async add_card() {
    const new_c = this.new_card
    if (new_c.name === "") {
      return
    }

    // アクションが設定されている場合は強制的にアクションカードにする
    if (new_c.action_point >= 1){
      new_c.type = 'action'
    }

    // 同じ名前のカードは追加できなくする
    const same_cards = this.supply.filter((val) => { return val.name === new_c.name })
    if (same_cards.length !== 0) {
      return
    }
    this.supply.push(new_c)
    await this.storage.set_supply(this.supply)
    this.new_card = new Card()
  }

  async add_card_to_deck(card: Card) {
    this.field_status = await this.storage.add_card_to_deck(card, this.field_status)
  }

  async remove_card(card: Card) {
    this.supply = this.supply.filter((val) => { return val.name !== card.name })
    await this.storage.set_supply(this.supply)
  }

}
