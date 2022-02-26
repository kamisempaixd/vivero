import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from '../servicios/apiservice.service';


@Component({
  selector: 'app-nuevaplanta',
  templateUrl: './nuevaplanta.page.html',
  styleUrls: ['./nuevaplanta.page.scss'],
})
export class NuevaplantaPage implements OnInit {

  categorias:any;
  estados:any;
  id:String;
  estado:boolean;
  txtCodigo: any = "";
  txtNombre: any = "";
  txtPreciop: any = "";
  txtPreciov: any = "";
  txtStock: any = "";
  txtDescripcion: any = "";
  txtImagen: any = "Default.jpg";
  txtCategoria: any = "";
  txtEstado: any = "";
  img_data:any = [];
  previsualizacion:String;

  constructor(
    private ActivatedRoute: ActivatedRoute, private servicio: ApiserviceService, private router: Router, private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.estado = false;
    this.id = this.ActivatedRoute.snapshot.paramMap.get("id");
    console.log("id",this.id)
    if(this.id == undefined){
      this.estado = true;
    }
    console.log(this.estado);

    this.cargarCategorias();
    this.cargarEstados();    

  }

  async guardar(){

    if(this.estado){
      let planta = {"codigo":this.txtCodigo, "nombre":this.txtNombre, "preciop":this.txtPreciop, "preciov":this.txtPreciov, "stock":this.txtStock, "descripcion":this.txtDescripcion, "imagen":this.previsualizacion, "idcategoria":this.txtCategoria, "idestado":this.txtEstado};
      this.servicio.insertar_panta(planta).subscribe(datos => {this.router.navigateByUrl("/home");}); 
      console.log(planta);
      alert("guardado");
    }else{
      alert("actualizado");
    }

  }

cargarCategorias(){
  this.servicio.lista_categorias().subscribe(
    (resc) => {
      this.categorias = resc, console.log(this.categorias);
    }
  )
}
  
cargarEstados(){
  this.servicio.lista_estados().subscribe(
    (rese) => {
      this.estados = rese, console.log(this.estados);
    }
  )
}

capturar(event): any{
  const imgcapture = event.target.files[0]
  console.log(imgcapture);
  this.extraerBase64(imgcapture).then((imagen:any) =>{
    this.previsualizacion = imagen.base;
    console.log(this.previsualizacion);
  });
  this.img_data.push(imgcapture);
}

extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

}
