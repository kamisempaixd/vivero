import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


/*
export interface Product {
  id: number;
  cantidad: number;
  Codigo: String;
  Nombre: String;
  Preciop: number;
  Preciov: number;
  Stock: number;
  Descripcion: String;
  Imagen: String;
  Categoria: number;
  Estado: number;
}*/

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient, private toastController: ToastController) { }

  async presentToast(){
    const toast = await this.toastController.create(
      {
        message:"Stock maximo",
        duration: 500,
        position: "middle"
      }
    );
    toast.present();
  }

  //carrito de compras

  private carrito =[];
  private carritoNumeroItems = new BehaviorSubject(0);

  obatenerCarrito(){
    return this.carrito;
  }

  obtenerCarritoNumeroItems(){
    return this.carritoNumeroItems;
  }

  bajarCantidadProducto(product){
    for(let [index, p] of this.carrito.entries()){
      if(p.id_plantas === product.id_plantas){
        p.cantidad -= 1; if (p.cantidad == 0) {
          this.carrito.splice(index, 1)
        }
      }
    }

    this.carritoNumeroItems.next(this.carritoNumeroItems.value - 1);
  }

  eliminarProducto(product){
    for(let [index, p] of this.carrito.entries()){
      if(p.id_plantas === product.id_plantas){
        this.carritoNumeroItems.next(this.carritoNumeroItems.value - p.cantidad);
        this.carrito.splice(index, 1)
      }
    }
  }

  agregarProducto(producto){
    let agregado = false;
    console.log(agregado);
    for(let p of this.carrito){
      if(p.id_plantas === producto.id_plantas){      
        if(p.cantidad < p.stock){
          p.cantidad+=1;
          console.log(p.id_plantas+"--"+producto.id_plantas+"--"+p.stock+"--"+p.cantidad);
        }else{
          this.presentToast();
        }
        agregado = true;
        break;
      }
    }
console.log(agregado);
    if(!agregado){
      this.carrito.push(producto);
    }

    this.carritoNumeroItems.next(this.carritoNumeroItems.value + 1);
  }

  limpiarCarrito(){
    this.carrito = [];
  }

  //facturar

  facturar(total){
    for(let p of this.carrito){
      console.log(p.id_plantas+"--"+p.cantidad+"--"+p.precio_venta);
    }
    console.log("total--"+total);
  }

  //fin facturar

  //fin carrito

  lista_plantas(){
    return this.http.get("http://localhost/enano/Controladores/lista_plantas.php");
  }

  lista_estados(){
    return this.http.get("http://localhost/enano/Controladores/lista_estados.php");
  }

  lista_categorias(){
    return this.http.get("http://localhost/enano/Controladores/lista_categorias.php");
  }

  insertar_panta(planta){
    return this.http.post("http://localhost/enano/Controladores/insertar_planta.php",planta);
  }

}
