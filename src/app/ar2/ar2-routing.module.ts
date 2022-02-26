import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Ar2Page } from './ar2.page';

const routes: Routes = [
  {
    path: '',
    component: Ar2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Ar2PageRoutingModule {}
