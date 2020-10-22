/**
 * Clase que describe un usuario de la base de datos PRIMO.
 */
export class User {
    /** Atributos de Clase **/
    idUsuario:number;
    strUsuario :string;
    strPassword: string;
    intNumIntentos:number;
    bitActivo:number;
    intTipoUsuario:number;
}
