import { Injectable } from '@angular/core';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Field_Status, Card } from '../../model/AppModel';
import _ from 'lodash'


/*
  Generated class for the StorageProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StorageProvider {

  constructor(
    private storage: Storage,
  ) {
  }

  async get_field_status(): Promise<Field_Status> {
    const res = await this.storage.get('Field_Status')
    return (res == null ? new Field_Status : res)
  }

  async set_field_status(f_s: Field_Status) {
    await this.storage.set('Field_Status', f_s)
  }

  async get_supply() {
    const res = await this.storage.get('Supply')
    return (res == null ? [] : res)
  }

  async set_supply(supply: Card[]) {
    await this.storage.set('Supply', supply)
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

    await this.set_field_status(new_f)
    return new_f
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
      same_card = []
    }
    new_f.deck_index = new_f.deck_index.filter((val) => { return val.card.name !== card.name }).concat(same_card)
    await this.set_field_status(new_f)
    return new_f
  }

}
