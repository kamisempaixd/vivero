import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'nuevaplanta/:id',
    loadChildren: () => import('./nuevaplanta/nuevaplanta.module').then( m => m.NuevaplantaPageModule)
  },
  {
    path: 'nuevaplanta',
    loadChildren: () => import('./nuevaplanta/nuevaplanta.module').then( m => m.NuevaplantaPageModule)
  },
  {
    path: 'ar',
    loadChildren: () => import('./ar/ar.module').then( m => m.ArPageModule)
  },
  {
    path: 'ar2',
    loadChildren: () => import('./ar2/ar2.module').then( m => m.Ar2PageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./carrito/carrito.module').then( m => m.CarritoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
