import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { ApiserviceService } from '../servicios/apiservice.service';
import { ModalController } from '@ionic/angular';
import { CarritoPage } from '../carrito/carrito.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  plantas:any;
  filtro_plantas:any;
  carrito=[];
  contadorItems: BehaviorSubject<number>;

  constructor(private servicio: ApiserviceService, private toastController: ToastController, private router:Router, public modalController: ModalController) {
    this.cargarListaPlantas();

  }

  async presentToast(mensaje){
    const toast = await this.toastController.create(
      {
        message:mensaje,
        duration: 500,
        position: "middle"
      }
    );
    toast.present();
  }

  filtrar_plantas(event){
    const text = event.target.value;;
    this.filtro_plantas = this.plantas;
    if(text && text.trim() != ""){
      this.filtro_plantas = this.filtro_plantas.filter((planta:any)=>{
        if (((planta.nombre.toLowerCase().indexOf(text.toLowerCase())) > -1))
        return (planta.nombre.toLowerCase().indexOf(text.toLowerCase())) > -1 
        else{
          return (planta.codigo.toLowerCase().indexOf(text.toLowerCase())) > -1 
        }
      })
    }
  }

cargarListaPlantas(){
  this.servicio.lista_plantas().subscribe(
    (res) => {
      this.plantas = res, console.log(this.plantas);
      this.filtro_plantas = this.plantas;
    }
  )
}

async abrirCarrito(){
  const modal = await this.modalController.create({
    component: CarritoPage,
    cssClass: 'my-custom-class'
  });
  return await modal.present();
}

addCarrito(product){
  console.log(product);
  product.cantidad=1;
  this.presentToast("añadido satisfactoriamente");
  this.servicio.agregarProducto(product);
}

}
