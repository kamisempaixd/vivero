import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Ar2PageRoutingModule } from './ar2-routing.module';

import { Ar2Page } from './ar2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ar2PageRoutingModule
  ],
  declarations: [Ar2Page]
})
export class Ar2PageModule {}
