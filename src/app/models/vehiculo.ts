import { Garaje } from './garaje';
import { Modelo } from './modelo';
import { TipoVehiculo } from './tipoVehiculo';

export class Vehiculo {
    public idVehiculo : number;
    public intAnio : number;
    public strObservacion : string;
    public strSerial : string;
    public strColor : string;
    public bitActivo : number;
    public intPuertas : number;
    public strMotor : string;
    public strTransmision : string;
    public strPathSOAT :string;
    public bitSubido : number;
    public strPlaca : string;
    public myGaraje : Garaje;
    public myTipoVehiculo? : TipoVehiculo;
    public myModelo : Modelo;

}
