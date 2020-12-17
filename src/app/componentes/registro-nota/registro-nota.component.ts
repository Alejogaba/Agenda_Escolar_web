import { Component, OnInit } from '@angular/core';
import { Calificacion } from 'src/app/models/calificacion';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import { CalificacionesService } from 'src/app/servicios/calificaciones.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-registro-nota',
  templateUrl: './registro-nota.component.html',
  styleUrls: ['./registro-nota.component.css']
})
export class RegistroNotaComponent implements OnInit {

  calificacion:Calificacion=new Calificacion("","","1074321423","",0,0,0,"");
  listaAlumnos:any = [];
  listaAsignaturas:any = [];
  listaCursos:any = [];


  constructor(private alumnoService:AlumnosService,private asignaturaService:AsignaturasService,
    private calificacionService:CalificacionesService, private cursoService:CursosService,
    private globalService:GlobalService) { 
    
  }

  ngOnInit() {
    this.calificacion = new Calificacion("","","1074321423","",0,0,0,"")
    this.cargarAlumnos();
    this.cargarCursos();
    this.cargarAsignaturas();
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(alumnos=>{
      this.listaAlumnos = alumnos;
    })
  }

  cargarCursos() {
    this.cursoService.getCursos().subscribe(cursos=>{
      this.listaCursos = cursos;
    })
  }
  
  cargarAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe(asignaturas=>{
      this.listaAsignaturas = asignaturas;
    })
  }

  guardarCalificacion(){
    this.calificacionService.sendtoFirebase(this.calificacion).then(res=>{
      console.info("Se guardo la calificación con exitó");
      this.globalService.showSuccess("Se registro la calificación con exitó");
      this.limpiar();
    }).catch(err=>{   
      this.globalService.showError(err);
      console.log(err);
    })
  }

  limpiar(){
    this.calificacion = new Calificacion("","","1074321423","",0,0,0,"");
  }

}
