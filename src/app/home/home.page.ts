import { Component } from '@angular/core';
import { ApiserviceService } from '../servicios/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  plantas:any;
  filtro_plantas:any;
  constructor(private servicio: ApiserviceService) {
    this.cargarListaPlantas();

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

}
