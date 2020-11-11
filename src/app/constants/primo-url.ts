/**
 * Esta clase contiene todas las direcciones URL que describen e invocan
 * cada uno de los servicios de PrimoApp
 */
export class PrimoURL {
    /**
     * La URL de acceso web al servidor de aplicaciones que tiene expuesto
     * cada uno de los servicios listados.
     */
    private restServerAccess:string='http://35.202.38.48:8080/PrimoApp/';
    
    //private restServerAccess:string='http://localhost:8080/PrimoApp/';
    
    /**
     * URL de invocacion del servicio de login, reemplazar las palabras:
     * 1. username por el usuario ingresado por el usuario
     * 2. Password por la contraseña ingresada por el usuario.
     * 3. Tipo 1 para negocios, 0 para usuarios.
     */ 



    public PR_APIBASE_URL : string = `${this.restServerAccess}`;

    public PR_NEWUSER_URL : string = `${this.restServerAccess}usuario`;

    public PR_LOGIN_URL:string=this.restServerAccess+'login/username/password/usrtype';

}
