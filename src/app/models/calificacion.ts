
export class Calificacion {
    id:string="";
    idAsignatura:string|null;
    idAlumno:string|null;
    idDocente:string|null;
    idCurso:string|null;
    calificacion:number;
    comentario:string;
    porcentaje:number;
    periodo:number;
    fecha_registro:string= new Date().toLocaleString();

    constructor(idAsignatura:string,idAlumno:string,idDocente:string|null,idCurso:string,nota:number,porcentaje:number,periodo:number
        ,comentario:string){
        this.idAlumno=idAlumno;
        this.idAsignatura=idAsignatura;
        this.idDocente=idDocente;
        this.calificacion=nota;
        this.porcentaje=porcentaje;
        this.periodo=periodo;
        this.comentario=comentario;
        this.idCurso=idCurso;
        
    }
}
