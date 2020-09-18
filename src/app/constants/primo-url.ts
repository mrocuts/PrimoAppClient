/**
 * Esta clase contiene todas las direcciones URL que describen e invocan
 * cada uno de los servicios de PrimoApp
 */
export class PrimoURL {
    /**
     * La URL de acceso web al servidor de aplicaciones que tiene expuesto
     * cada uno de los servicios listados.
     */
    private restServerAccess:string='http://192.168.0.4:8080/';
    
    /**
     * URL de invocacion del servicio de login, reemplazar las palabras:
     * 1. username por el usuario ingresado por el usuario
     * 2. Password por la contraseña ingresada por el usuario.
     * 3. Tipo 1 para negocios, 0 para usuarios.
     */ 
    public PR_LOGIN_URL:string=this.restServerAccess+'login/username/password/usrtype';
}
