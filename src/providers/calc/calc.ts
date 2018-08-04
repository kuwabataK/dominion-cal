import { Injectable } from '@angular/core';
import { Card, Field_Status } from '../../model/AppModel';


/*
  Generated class for the CalcProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CalcProvider {

  constructor() {
  }

  /**
   * 手札から出せる最大金量を出力します。
   * @param hands 
   */
  calc_generate_point(field_status: Field_Status): Field_Status {
    const f = field_status
    let new_f = f
    while (new_f.action_point > 0) {
      new_f.hands.sort((a, b) => { return b.action_point - a.action_point })
      new_f = this.execOneActionCard(new_f.hands[0], new_f)
    }
    return new_f
  }

  /**
   * 第二引数に入れた手札に対して第一引数のカードを実行します。
   * 残りのカードを第３引数で指定します。
   * 引数は変更しません
   * 
   * @param card 
   * @param fiels_status
   */
  execOneActionCard(card: Card, fiels_status: Field_Status): Field_Status {
    const f = fiels_status
    let new_f = f
    new_f.money_point += card.money_point
    new_f.action_point -= 1
    new_f.action_point += card.action_point
    if (card.draw_num > 0) {
      new_f = this.drawCard(card.draw_num, new_f)
    }
    return new_f
  }

  /**
   * 指定した枚数のカードをデッキから引いて、結果を返します
   * 引数は変更しません
   * 
   * @param num 
   * @param deck 
   */
  drawCard(num: number, fiels_status: Field_Status): Field_Status {
    const f = fiels_status
    let new_f = f
    if (num >= new_f.deck.length) {
      new_f.deck = []
      new_f.hands = f.hands.concat(f.deck)
      return new_f
    }

    Array(num).fill('').map(() => {
      const index = Math.floor(Math.random() * new_f.deck.length)
      new_f.hands.push(new_f.deck[index])
      new_f.deck = new_f.deck.filter((val, i) => { return i !== index })
    })
    return new_f
  }
}
