import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { rejects } from 'assert';
import { map } from 'rxjs/operators';
import { Alumno } from 'src/app/models/alumno';
import { Asignatura } from 'src/app/models/asignatura';
import { Calificacion } from 'src/app/models/calificacion';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import { CalificacionesService } from 'src/app/servicios/calificaciones.service';
import { CursosService } from 'src/app/servicios/cursos.service';

@Component({
  selector: 'app-consulta-nota-docente',
  templateUrl: './consulta-nota-docente.component.html',
  styleUrls: ['./consulta-nota-docente.component.css']
})
export class ConsultaNotaDocenteComponent implements OnInit {


  listaNotas:any = [];
  listaCursos:any = [];
  listaAsignaturas:any = [];
  listaPeriodos:any[] = [];
  sumaPeriodos:number[] = [];
  nombreAsignatura:string|null="No definido";
  fecha:string = formatDate(new Date(), 'dd/MM/yyyy', 'en');
  nombreAlumno: string | null="No definido";
  nombreCurso: string | null="No definido";
  idAsignaturaSeleccionada: string="";
  idCursoSeleccionado: string="";

  constructor(private calificacionesService:CalificacionesService,
    private asignaturaService:AsignaturasService, private alumnoService:AlumnosService
    ,private cursoService:CursosService) { }

  ngOnInit(): void {
    this.cargarAsignaturas();
    this.cargarCursos();
  }

  async cargarNotas() {

    return new Promise((resolve,rejects)=>{
      this.listarNotas().then(async res=>{
      
        this.listaNotas.forEach( (async (element: Calificacion,index: number) => {
          
          
            await this.buscarAsignatura(element.idAsignatura).then(res=>{
              element.idAsignatura=res as string;
            }).catch(err=>{element.idAsignatura=element.idAsignatura;});
    
            await this.buscarCurso(element.idCurso).then(res=>{
              element.idCurso=res as string;
            }).catch(err=>{element.idCurso=element.idCurso;});
  
            this.obtenerPeriodos(element.periodo,element.calificacion,element.porcentaje);

            this.sumaPeriodos[element.periodo-1]=(element.calificacion*(element.porcentaje/100))+this.sumaPeriodos[element.periodo-1];
    
            element.fecha_registro=formatDate(element.fecha_registro, 'dd/MM/yyyy', 'en');
          
            console.log(this.listaPeriodos);
        }));
        
      })
      resolve("todo cargado");
    })
    
    
  }


  async cargarDatos(){
    await this.cargarNotas();
    await this.calcularTotalPeriodo(this.sumaPeriodos);
    console.log("datos cargados")
  }

  obtenerPeriodos(periodo:number,nota:number,porcentaje:number){
    //let calculo:number= (nota*(porcentaje/100)+this.listaPeriodos[periodo-1].total);
      this.listaPeriodos[periodo-1]=
      {"periodo":periodo,
       "total":(nota*(porcentaje/100)+0)};
      console.log("Periodo añadido")
  }

  async calcularTotalPeriodo(sumaNotas:number[]){
    return new Promise((resolve,rejects)=>{
      for (let index = 0; index < this.listaPeriodos.length; index++) {
        this.listaPeriodos[index] = {"periodo":index+1,"total":sumaNotas[index]};
        console.log("total calculado");
      }
      resolve("total calculado")
    })

  }

  async listarNotas() {
    this.limpiar();
    return new Promise((resolve,rejects)=>{
      this.calificacionesService.getCalificaciones().subscribe(notas=>{
        if(notas!=null){
          this.listaNotas = notas;
          resolve("ok")
        }else{
          rejects("No hay notas")
        }
      })
    })
    
  }

    async buscarAsignatura(idAsignatura:string|null){
      return new Promise(async (resolve,rejects)=>{
        if(idAsignatura!=null){
    this.asignaturaService.getAsignatura(idAsignatura).subscribe(asignatura => {
      resolve((asignatura as Asignatura).nombre)
          });
    }
    else{
      rejects("No definido")
    }
      })
  }

  async buscarCurso(idCurso:string|null){
    return new Promise(async (resolve,rejects)=>{
      if(idCurso!=null){
  this.cursoService.getCurso(idCurso).subscribe(curso => {
    resolve((curso as Curso).nombre)
        });
  }
  else{
    rejects("No definido")
  }
    })
}

  busquedaAsignatura(idAsignatura:string|null):any{
      if(idAsignatura!=null)
  this.asignaturaService.getAsignatura(idAsignatura).subscribe(asignatura=>{
   this.nombreAsignatura=(asignatura as Asignatura).nombre;
  })
  }

  busquedaAlumno(idAlumno:string|null):any{
    if(idAlumno!=null)
this.alumnoService.getAlumno(idAlumno).subscribe(alumno=>{
 this.nombreAlumno=(alumno as Alumno).nombres;
})
}

busquedaCurso(idCurso:string|null):any{
  if(idCurso!=null)
this.cursoService.getCurso(idCurso).subscribe(curso=>{
this.nombreCurso=(curso as Curso).nombre;
})
}
  

cargarAsignaturas() {
  this.asignaturaService.getAsignaturas().subscribe(asignaturas=>{
    this.listaAsignaturas = asignaturas;
  })
}

cargarCursos() {
  this.cursoService.getCursos().subscribe(cursos=>{
    this.listaCursos = cursos;
  })
}

limpiar(){
  this.listaNotas = [];
}
}
