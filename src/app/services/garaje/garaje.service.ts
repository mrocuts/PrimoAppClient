import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Garaje } from 'src/app/models/garaje';
import { Marca } from 'src/app/models/marca';
import { Vehiculo } from 'src/app/models/vehiculo';

import { catchError, defaultIfEmpty, isEmpty, map, tap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

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
    return this.client.get(`${this.urlLink}garaje/${idUsuario}`).pipe(
      map(data => {
        console.log(`el id garaje es ${data['idGaraje']}`);
        return this.getVehiculo(data['idGaraje']).subscribe(data => {
          if(data === []){
            console.log(data); 
          }
        });
  }))
}
  
  getTipoVehiculo(){
    return this.client.get(`${this.primourl.PR_APIBASE_URL}/tipoVehiculo`);
  }

  getVehiculo(idGaraje : number){
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}vehiculo/${idGaraje}`);
  }

  getMarcaByTipoVehiculo(idTipovehiuclo: number){
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}/marca/${idTipovehiuclo}`);
  }

  getModeloByMarca(idMarca : number){
    return this.client.get(`${this.primourl.PR_APIBASE_URL}modelo/${idMarca}`);
  }

  postVehiculo(vehiculo :Vehiculo){
    return this.client.post(`${this.primourl.PR_APIBASE_URL}vehiculo`,vehiculo).pipe(
      catchError(err => {
        let errorMsg: string;
        if (err.error instanceof ErrorEvent) {
            errorMsg = `Error: ${err.error.message}`;
        } else {
            errorMsg = this.getServerErrorMessage(err);
        }
        return throwError([err.error,errorMsg]);
      })
    );
  }


  private getServerErrorMessage(error: HttpErrorResponse): string {
    switch (error.status) {
        case 404: {
            return `Not Found: ${error.message}`;
        }
        case 403: {
            return `Access Denied: ${error.message}`;
        }
        case 500: {
            return `Internal Server Error: ${error.message}`;
        }
        default: {
            return `Unknown Server Error: ${error.message}`;
        }

    }
}
}
