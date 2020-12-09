export class Alumno {
id:string;
idCurso:string;
nombres:string;
apellidos:string;
fecha_nacimiento:Date|null;
telefono:number|null;
correo_electronico:string;

constructor(id:string,idCurso:string,nombres:string,apellidos:string,fecha_nacimiento:Date|null,telefono:number|null,correo_electronico:string){
    this.id=id;
    this.idCurso=idCurso;
    this.apellidos=apellidos;
    this.nombres=nombres;
    this.fecha_nacimiento=fecha_nacimiento;
    this.telefono=telefono;
    this.correo_electronico=correo_electronico;
}
}