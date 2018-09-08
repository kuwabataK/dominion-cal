import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Card, Field_Status } from '../../model/AppModel';
import { CalcProvider } from '../../providers/calc/calc';
import { StorageProvider } from '../../providers/storage/storage';
import { Chart } from 'chart.js';

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

  @ViewChild('barCanvas') barCanvas;
  barChart: any;

  chart_label: number[] = [
    1, 2, 3, 4, 5, 6
  ]

  chart_data: number[] = [
    0, 0, 0, 0, 0, 0
  ]

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
    private storage: StorageProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {
  }

  async ionViewDidLoad() {
    this.field_status = await this.storage.get_field_status()
    this.calc_money(100)
    this.chartInit()
  }
  async ionViewWillEnter() {
    this.field_status = await this.storage.get_field_status()
    this.deck_length = this.field_status.deck.length
  }


  async calc_money(count: number) {

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    await loading.present();

    // アクションフェイズを実行
    const f_a = Array(count).fill('').map(() => {
      return this.calc.follow_turn(this.field_status)
    })

    // お金を計算
    let total_money = 0
    const mp_a = f_a.map((val) => {
      total_money += val.money_point
      return val.money_point
    })

    // 結果をビューに送る
    this.deck_length = this.field_status.deck.length
    this.avarage_money = total_money / count
    this.max_money = Math.max(...mp_a)
    this.min_money = Math.min(...mp_a)

    // グラフを作る
    let label = mp_a.filter((x, i, self) => { return self.indexOf(x) === i });
    label.sort((a, b) => { return a - b })

    this.chart_data = label.map((_num) => {
      return mp_a.filter((e) => { return _num === e }).length
    })
    this.chart_label = label
    this.chartInit()

    loading.dismiss();

  }

  async delete_card(card: Card) {
    this.field_status = await this.storage.remove_card_from_deck(card, this.field_status)
    this.deck_length = this.field_status.deck.length
  }

  async add_card(card: Card) {
    this.field_status = await this.storage.add_card_to_deck(card, this.field_status)
    this.deck_length = this.field_status.deck.length
  }

  async delete_all() {

    let alert = this.alertCtrl.create({
      title: '確認',
      message: '本当に削除してよろしいですか?',
      buttons: [
        {
          text: 'キャンセル',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: '実行',
          handler: () => {
            this.field_status.deck = []
            this.field_status.deck_index = []
            this.deck_length = this.field_status.deck.length
            this.storage.set_field_status(this.field_status)
          }
        }
      ]
    });
    alert.present();
  }

  private chartInit() {
    this.barChart = new Chart(this.barCanvas.nativeElement, {

      type: 'bar',
      data: {
        labels: this.chart_label,
        datasets: [{
          label: 'count',
          data: this.chart_data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        tooltips:{
          enabled: false,
          mode: 'dataset'
        }
      }

    });
  }

}
