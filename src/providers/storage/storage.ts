import { Injectable } from '@angular/core';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Field_Status, Card } from '../../model/AppModel';
import _ from 'lodash'
import { UtilProvider } from '../util/util';


/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage,
    private util: UtilProvider,
  ) {
  }

  async get_field_status(): Promise<Field_Status> {
    const res = await this.storage.get('Field_Status')
    return (res == null ? new Field_Status : res)
  }

  async set_field_status(f_s: Field_Status) {
    const deck = this.util.sort_card(f_s.deck)
    const deck_index = this.util.sort_card_index(f_s.deck_index)
    const new_f: Field_Status = {
      action_point: f_s.action_point,
      deck: deck,
      deck_index: deck_index,
      money_point: f_s.money_point,
      hands: f_s.hands
    }
    await this.storage.set('Field_Status', new_f)
    return new_f
  }

  async get_supply() {
    const res = await this.storage.get('Supply')
    const first_supply: Card[] =[{
      name: "屋敷",
      type: 'money',
      money_point: 0,
      action_point: 0,
      draw_num: 0
    },
    {
      name: "銅貨",
      type: 'money',
      money_point: 1,
      action_point: 0,
      draw_num: 0
    },
    {
      name: "銀貨",
      type: 'money',
      money_point: 2,
      action_point: 0,
      draw_num: 0
    },
    {
      name: "金貨",
      type: 'money',
      money_point: 3,
      action_point: 0,
      draw_num: 0
    }]
    return (res == null ? first_supply : res)
  }

  async set_supply(supply: Card[]) {
    const n_supply = this.util.sort_card(supply)
    await this.storage.set('Supply', n_supply)
    return n_supply
  }

  async add_card_to_deck(card: Card, field_status: Field_Status) {
    let new_f: Field_Status = JSON.parse(JSON.stringify(field_status))
    new_f.deck.push(card)
    const same_card = new_f.deck_index.filter((val) => { return val.card.name === card.name })
    if (same_card.length === 0) {
      new_f.deck_index.push({
        card: card,
        cnt: 1
      })
    } else {
      same_card[0].cnt += 1
      new_f.deck_index = new_f.deck_index.filter((val) => { return val.card.name !== card.name }).concat(same_card)
    }

    return await this.set_field_status(new_f)
  }

  async remove_card_from_deck(card: Card, field_status: Field_Status) {
    let new_f: Field_Status = JSON.parse(JSON.stringify(field_status))
    let same_card = new_f.deck_index.filter((val) => { return val.card.name === card.name })
    if (same_card.length === 0) { return new_f }

    // deckからカードを削除
    let c = new_f.deck.filter((val) => { return val.name !== card.name })
    let r_c = new_f.deck.filter((val) => { return val.name === card.name })
    r_c.pop()
    new_f.deck = c.concat(r_c)

    // deck_indexからカードを削除
    if (same_card[0].cnt >= 2) {
      same_card[0].cnt -= 1
    } else {
      same_card[0].cnt = 0
    }
    new_f.deck_index = new_f.deck_index.filter((val) => { return val.card.name !== card.name }).concat(same_card)
    return await this.set_field_status(new_f)
  }

}
