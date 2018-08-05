import { Injectable } from '@angular/core';
import { Storage } from '../../../node_modules/@ionic/storage';
import { Field_Status, Card } from '../../model/AppModel';

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

  async get_field_status(): Promise<Field_Status>{
    const res = await this.storage.get('Field_Status')
    return (res == null ? new Field_Status : res)
  }

  async set_field_status(f_s: Field_Status){
    await this.storage.set('Field_Status', f_s)
  }

  async get_supply(){
    const res = await this.storage.get('Supply')
    return (res == null ? [] : res)
  }

  async set_supply(supply: Card[]){
    await this.storage.set('Supply', supply)
  }

}
