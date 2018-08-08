import { Injectable } from '@angular/core';
import { StorageProvider } from '../storage/storage';

/*
  Generated class for the UtilProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UtilProvider {

  constructor(
    private storage :StorageProvider,
  ) {
  }

  

}
