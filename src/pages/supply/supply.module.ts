import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplyPage } from './supply';

@NgModule({
  declarations: [
    SupplyPage,
  ],
  imports: [
    IonicPageModule.forChild(SupplyPage),
  ],
})
export class SupplyPageModule {}
