import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PrimoURL } from 'src/app/constants/primo-url';
import { Garaje } from 'src/app/models/garaje';
import { Marca } from 'src/app/models/marca';
import { Vehiculo } from 'src/app/models/vehiculo';

import { catchError, concatMap, isEmpty, tap, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TipoVehiculo } from 'src/app/models/tipoVehiculo';

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


  getGaraje(idUsuario : number){
    return this.client.get<Garaje>(`${this.primourl.PR_APIBASE_URL}garaje/${idUsuario}`)
                      .pipe(tap(data => console.log(data)),
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

  
  getTipoVehiculo(){
    return this.client.get<TipoVehiculo>(`${this.primourl.PR_APIBASE_URL}/tipoVehiculo`).pipe(
      catchError(this.getServerErrorMessage));
    }
    
  getVehiculo(idGaraje : number){
    // let promise = new Promise<Vehiculo[]>((resolve, reject)=>{
    //   this.urlLink=this.primourl.PR_APIBASE_URL;
    //   this.client.get<Vehiculo[]>(`${this.urlLink}vehiculo/${idGaraje}`).toPromise()
    //   .then(res => {
    //     console.log(res);
    //     console.log('servicio');
    //   },
    //   err => { reject(err);});   
    // });
    // return promise;
  
  

    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get<Vehiculo[]>(`${this.urlLink}vehiculo/${idGaraje}`).pipe(
      tap(data => console.log(data)),
      catchError((err) => {
        throw this.getServerErrorMessage(err);
      })
    )
  }
    
  getMarcaByTipoVehiculo(idTipovehiuclo: number){
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}/marca/${idTipovehiuclo}`).pipe(
      catchError((err) => {
        throw this.getServerErrorMessage(err);
      }));
  }
      
  getModeloByMarca(idMarca : number){
    return this.client.get(`${this.primourl.PR_APIBASE_URL}modelo/${idMarca}`).pipe(
      catchError((err) => {
        throw this.getServerErrorMessage(err);
      }));
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
          
  getGarajeVehiculoUsuario(idUsuario : number){
    this.urlLink=this.primourl.PR_APIBASE_URL;
    return this.client.get(`${this.urlLink}garaje/${idUsuario}`).pipe(
      concatMap((data) => this.getVehiculo(data['idGaraje'])),
      catchError((err) => {
        throw this.getServerErrorMessage(err);
      }));
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
