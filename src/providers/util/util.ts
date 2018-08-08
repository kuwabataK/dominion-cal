import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';
import { Card, Card_Index } from '../../model/AppModel';
import _ from 'lodash'


/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(
  ) {
  }

  sort_card(card: Card[]) {
    let c: Card[] = _.cloneDeep(card)
    c.sort((a, b) => {
      if (a.name < b.name) { return -1 }
      if (a.name > b.name) { return 1 }
      return 0
    })
    return c
  }

  sort_card_index(card: Card_Index[]) {
    let c: Card_Index[] = _.cloneDeep(card)
    c.sort((a, b) => {
      if (a.card.name < b.card.name) { return -1 }
      if (a.card.name > b.card.name) { return 1 }
      return 0
    })
    return c
  }



}
