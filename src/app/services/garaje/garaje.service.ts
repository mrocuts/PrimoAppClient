import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Garaje } from 'src/app/models/garaje';
import { Marca } from 'src/app/models/marca';
import { Vehiculo } from 'src/app/models/vehiculo';

import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GarajeService {

   /** Atributos de Método **/
   urlLink:string='';
   primourl:PrimoURL;
   private garaje : Garaje;
   private vehiculo : Vehiculo;
   private marca : Marca;

  constructor(private client : HttpClient) { 
    this.primourl=new PrimoURL();
  }

  getGarajeUsuario(idUsuario : number)
  {
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}/garaje/${idUsuario}`).pipe(
      tap(data => console.log(data)),
      map(data => {
        console.log(`${this.urlLink}/vehiculo/${data['idGaraje']}`);
        return this.client.get(`${this.urlLink}/vehiculo/${data['idGaraje']}`).pipe(
          tap(data => console.log(data)),
          map((data) => {
              console.log(data);
          })
        );
      })
    );
  }
  
  getTipoVehiculo(){
    return this.client.get(`${this.primourl.PR_APIBASE_URL}/tipoVehiculo`);
  }

  getVehiculo(idGaraje : number){
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}/vehiculo/${idGaraje}`);
  }

  getMarcaByTipoVehiculo(idTipovehiuclo: number){
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}/marca/${idTipovehiuclo}`);
  }

  getModeloByMarca(idMarca : number){
    return this.client.get(`${this.primourl.PR_APIBASE_URL}modelo/${idMarca}`).pipe(
      map((marca:any) => ({ idMarca : marca.idMarca, 
                            idTipovehiuclo : marca.idTipoVehiculo,
                            strDescripcion : marca.strDescripciono,
                            bitActivo : marca.bitActivo}))
    );
  }
}
