export class Card {
    name: string = ''
    type: 'money' | 'action' = 'money'
    money_point: number = 0 // 出力できる金量
    action_point: number = 0 // アクションポイント
    draw_num: number = 0 // 
}

export class Field_Status{
    action_point: number = 1 // 残りのアクションポイント
    money_point: number = 0
    hands: Card[] = []
    deck: Card[] = []
    deck_index: Card_Index[] = []
}

/**
 * 表示用のカードの束、カードの名前と枚数を格納する
 */
export class Card_Index {
    card: Card = new Card
    cnt: number = 0
}