import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { CursosService } from 'src/app/servicios/cursos.service';
import { GradosService } from 'src/app/servicios/grados.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-gestion-cursos',
  templateUrl: './gestion-cursos.component.html',
  styleUrls: ['./gestion-cursos.component.css']
})
export class GestionCursosComponent implements OnInit {

  
  idCursoSeleccionado:string="";
  listaGrados:any = [];
  listaCursos:any = [];
  listaAlumnos:any = [];
  inputNombreMode:boolean=false;
  textoTextarea:string|null="Lista de cursos:";
  curso:Curso=new Curso("","","");


  constructor(private router:Router, private gradosService:GradosService,private globalService:GlobalService,
     private cursoService:CursosService,private alumnoService:AlumnosService, private location:Location) { }

  ngOnInit() {

    this.curso = new Curso("","","");
    this.idCursoSeleccionado="";
    this.inputNombreMode=false;
    this.cargarGrados();
    this.cargarCursos();
  
  }

  cargarGrados() {
    this.gradosService.getGrados().subscribe(grados=>{
      this.listaGrados = grados;
    })
  }

  cargarCursos() {
    this.cursoService.getCursos().subscribe(cursos=>{
      this.listaCursos = cursos;
      cursos.forEach(element => {
        if(element.nombre!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.nombre;
      });
    })
  }

  cargarAlumnosdeCurso() {
    this.alumnoService.getAlumnos_x_curso(this.idCursoSeleccionado).subscribe(alumnos=>{
      this.listaAlumnos=alumnos;
      alumnos.forEach(element => {
        this.textoTextarea=this.textoTextarea+"\n"+element.nombres;
      });
    })
  }
  
  guardarCurso(){
    this.cursoService.sendtoFirebase(this.curso).then(res=>{
      console.log("Se guardo el curso con exitó");
      this.globalService.showSuccess("Se guardo el curso con exitó");
      this.limpiar();
    }).catch(err=>{
      this.globalService.showError(err);
      console.log(err);
    })
  }

  seleccionCurso(){
    if(this.idCursoSeleccionado==""){
      this.inputNombreMode=false;
      this.limpiar();
    }else{
      this.listaCursos.forEach((element: Curso) => {
        if(element.id==this.idCursoSeleccionado){
          this.curso=element;
        }
      });
      this.inputNombreMode=true;
      this.textoTextarea="Alumnos del curso:"
       setTimeout(() => {
      this.cargarAlumnosdeCurso();
       }, 500);
    }
    
  }

  eliminarCurso(){
    this.cursoService.removefromFirebase(this.curso).then(res=>{
      console.log("Curso "+this.curso.nombre+" eliminado con exitó")
      this.globalService.showSuccess("Curso "+this.curso.nombre+" eliminado con exitó");
      this.listaAlumnos.forEach((element: Alumno) => {
        this.alumnoService.removefromFirebase(element.id);
      });
      this.limpiar();
    }).catch(er=>{
      this.globalService.showError(er);
      console.log(er);
    })
  }

  limpiar(){
    this.curso=new Curso("","","");
    this.idCursoSeleccionado="";
    this.inputNombreMode=false;
    this.recargarConsola();
  }

  recargarConsola(){
    this.textoTextarea="Lista de cursos:"
    setTimeout(() => {
      this.cargarCursos();
  }, 500);
  }

  volver(){
    this.location.back();
  };
}
