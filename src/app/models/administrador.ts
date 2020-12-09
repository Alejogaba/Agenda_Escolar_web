export class Administrador {
    id:string;
    nombres:string|null;
    apellidos:string|null;
    telefono:number|null;
    correo_electronico:string;

    constructor(id:string,nombres:string|null,apellidos:string|null,
        telefono:number|null,correo_electronico:string){
        this.id=id;
        this.apellidos=apellidos;
        this.nombres=nombres;
        this.telefono=telefono;
        this.correo_electronico=correo_electronico;
    }
}
