import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
HttpClient

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private http:HttpClient) { }

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
