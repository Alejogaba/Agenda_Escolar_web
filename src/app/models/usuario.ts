export class Usuario {
    id:string;
    correo_electronico:string;
    contrasena:String;
    rol:string;

    constructor(id:string,correo_electronico:string,contrasena:string,rol:string){
        this.id=id;
        this.correo_electronico=correo_electronico;
        this.contrasena=contrasena;
        this.rol=rol;
    }
}
