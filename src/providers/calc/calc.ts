import { Injectable } from '@angular/core';
import { Card, Field_Status } from '../../model/AppModel';
import _ from 'lodash'


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
   * ターンを進めます
   * @param field_status 
   */
  follow_turn(field_status: Field_Status): Field_Status {
    let new_f = _.cloneDeep(field_status)
    
    new_f = this.generate_first_hands(new_f)
    new_f = this.exec_action(new_f)
    new_f = this.exec_money(new_f)
    return new_f
  }

  /**
   * 最初の手札５枚を引きます
   * 
   * @param field_status 初期デッキ
   */
  private generate_first_hands(field_status: Field_Status): Field_Status {
    let new_f: Field_Status = _.cloneDeep(field_status)


    new_f = this.drawCard(5, new_f)
    return new_f
  }

  /**
   * 金貨の支払いを実行します
   * @param field_status 
   */
  private exec_money(field_status: Field_Status): Field_Status {
    let new_f: Field_Status = _.cloneDeep(field_status)

    new_f.hands.map((card) => {
      if (card.type === 'money') {
        new_f.money_point += card.money_point
      }
    })
    return new_f
  }

  /**
   * アクションフェイズを実行します。
   * 
   * @param hands 
   */
  private exec_action(field_status: Field_Status): Field_Status {
    let new_f: Field_Status = _.cloneDeep(field_status)
    while (new_f.action_point > 0) {
      if (new_f.hands.length === 0) { break; }
      const action_hands = new_f.hands.filter((val) => { return val.type === 'action' })
      if (action_hands.length === 0) { break; }
      // アクションポイント順に並び替える
      new_f.hands.sort((a, b) => { return b.action_point - a.action_point })
      // アクションカードを先頭に持ってくる
      new_f.hands.sort((a, b) => {
        if (a.type < b.type) {
          return -1
        }
        if (a.type > b.type) {
          return 1
        }
        return 0
      })

      // 先頭のアクションを実行
      new_f = this.execOneActionCard(action_hands[0], new_f)
      // console.log(new_f.action_point)
      console.log(new_f.money_point)
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
  private execOneActionCard(card: Card, field_status: Field_Status): Field_Status {
    let new_f: Field_Status = _.cloneDeep(field_status)


    // 定性的な処理
    new_f.money_point += card.money_point
    new_f.action_point -= 1
    new_f.action_point += card.action_point
    // ドローする
    if (card.draw_num > 0) {
      new_f = this.drawCard(card.draw_num, new_f)
    }
    // 手札を減らす
    new_f.hands.shift()
    return new_f
  }

  /**
   * 指定した枚数のカードをデッキから引いて、結果を返します
   * 引数は変更しません
   * 
   * @param num 
   * @param deck 
   */
  private drawCard(num: number, field_status: Field_Status): Field_Status {
    if (field_status.deck.length === 0) { return field_status }
    if (num === 0) { return field_status }
    let new_f: Field_Status = _.cloneDeep(field_status)


    if (num >= new_f.deck.length) {
      new_f.hands = new_f.hands.concat(new_f.deck)
      new_f.deck = []
      return new_f
    }

    Array(num).fill('').map(() => {
      let index = Math.floor(Math.random() * new_f.deck.length)
      new_f.hands.push(new_f.deck[index])
      new_f.deck = new_f.deck.filter((val, i) => { return i !== index })
    })
    return new_f
  }
}
