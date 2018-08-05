export class Card {
    name: string = ''
    type: string = 'money'
    money_point: number = 0 // 出力できる金量
    action_point: number = 0 // アクションポイント
    draw_num: number = 0 // 
}

export class Field_Status{
    action_point: number = 1 // 残りのアクションポイント
    money_point: number = 0
    hands: Card[] = []
    deck: Card[] = []
}