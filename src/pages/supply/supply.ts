import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    private storage:StorageProvider
  ) {
  }

  ionViewDidLoad() {
    this.init()
  }

  ionViewWillEnter(){
    this.init()
  }

  async init(){
    this.supply = await this.storage.get_supply()
    this.field_status = await this.storage.get_field_status()
  }

  async add_card(){
    const new_c = this.new_card
    this.supply.push(new_c)
    await this.storage.set_supply(this.supply)
    this.new_card = new Card()
  }

  async add_card_to_deck(card_name :string){
    const add_card = this.supply.filter((val)=>{return val.name === card_name})[0]
    this.field_status.deck.push(add_card)
    await this.storage.set_field_status(this.field_status)
  }

}
