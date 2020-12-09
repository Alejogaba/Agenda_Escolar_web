export class Curso {
    id:string|null;
    id_grado:string|null;
    nombre:string|null;
    
    constructor(id:string,id_grado:string,nombre:string){
        this.id=id;
        this.id_grado=id_grado;
        this.nombre=nombre;
    }
}
