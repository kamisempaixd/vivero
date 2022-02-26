import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ApiserviceService } from '../servicios/apiservice.service';
import {respuestaProductos, Producto} from '../interfaces/productos';
import { Button } from 'protractor';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  carrito: Producto[]=[];

  constructor(private carritoServicio: ApiserviceService, private modalCtrl: ModalController, private alertcontroller: AlertController) { }

  ngOnInit() {
    this.carrito = this.carritoServicio.obatenerCarrito();
    console.log(this.carrito);
  }

  bajarCantidad(product){
    this.carritoServicio.bajarCantidadProducto(product);
  }

  aumentarItemCarrito(product){
    this.carritoServicio.agregarProducto(product);
  }

  removerCarritoItem(product){
    this.carritoServicio.eliminarProducto(product);
  }

  obtenertotal(){
    return this.carrito.reduce((i,j) => i + j.precio_venta * j.cantidad, 0);
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async checkout(){

    let alert = await this.alertcontroller.create({
      header: 'Ventar realizada',
      message: 'La venta ha sido regsitrada',
      buttons: ['ok']
    });

    alert.present().then(
      ()=>{
        this.modalCtrl.dismiss();
      }
    );
      this.carritoServicio.facturar(this.obtenertotal());
      this.carritoServicio.limpiarCarrito();
  }
}
