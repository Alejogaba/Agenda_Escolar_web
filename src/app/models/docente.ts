export class Docente {
    id:string;
    idAsignatura:string;
    nombres:string;
    apellidos:string;
    fecha_nacimiento:string|null;
    telefono:number|null;
    correo_electronico:string;

    constructor(id:string,idAsignatura:string,nombres:string,apellidos:string,fecha_nacimiento:string|null,
        telefono:number|null,correo_electronico:string){
        this.id=id;
        this.idAsignatura=idAsignatura;
        this.apellidos=apellidos;
        this.nombres=nombres;
        this.fecha_nacimiento=fecha_nacimiento;
        this.telefono=telefono;
        this.correo_electronico=correo_electronico;
    }
                  
}