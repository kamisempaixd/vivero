import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NuevaplantaPageRoutingModule } from './nuevaplanta-routing.module';

import { NuevaplantaPage } from './nuevaplanta.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NuevaplantaPageRoutingModule
  ],
  declarations: [NuevaplantaPage]
})
export class NuevaplantaPageModule {}
