import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import {CursosService} from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-registro-usuario-alumno',
  templateUrl: './registro-usuario-alumno.component.html',
  styleUrls: ['./registro-usuario-alumno.component.css']
})
export class RegistroUsuarioAlumnoComponent implements OnInit {

  idAlumnoSeleccionado:string="";
  listaAlumnos:any = [];
  inputNombreMode:boolean=false;
  password:string="";
  minDate:any = {year: 1900, month: 1, day: 1};
  maxDate:any = {year:2150,month:12,day:12};
  currentDate:Date = new Date;
  alumno:Alumno=new Alumno("","","","",null,null,"");
  textoTextarea:string|null="Lista de alumnos:";

  constructor(private alumnoService:AlumnosService, private authService:AuthService,
     private usuarioService:UsuariosService, private location:Location, private router:Router,
     private globalService:GlobalService
     ) { }

  ngOnInit():void {

    this.limpiar();
    this.idAlumnoSeleccionado="";
    this.inputNombreMode=false;
    this.maxDate={year:this.currentDate.getFullYear(),month:this.currentDate.getMonth(),day:this.currentDate.getDay()};
  
  }

  cargarAlumnos() {
    this.alumnoService.getAlumnos().subscribe(alumnos=>{
      this.listaAlumnos = alumnos;
      alumnos.forEach(element => {
        if(element.nombres!=null&&element.id!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.id+" | "+element.nombres+" "+element.apellidos;
      });
    })
  }
  
  guardarAlumno(){
    this.alumnoService.sendtoFirebase(this.alumno).then(res=>{
      console.log("Se guardo el alumno con exitó");
      this.authService.createAccount(this.alumno.correo_electronico,this.alumno.id?.toString()).then(res=>{
        console.log("Cuenta creada con exitó");
        this.usuarioService.sendtoFirebases(this.alumno.id,this.alumno.correo_electronico,this.alumno.id,"alumno").then(res=>{
          console.log("Se creo el usuario con exitó");
          this.limpiar();
          this.globalService.showSuccess("Cuenta creada con exitó, redirigiendo al inicio...")
          setTimeout(() => {
            this.router.navigate(['login'])
        }, 2000);
        }).catch(err=>{
          console.error(err)
          this.globalService.showError(err);
        });
      }).catch(err=>{
        console.error("Error al crear la cuenta: \n"+err);
        this.globalService.showError("Error al crear la cuenta: \n"+err);
        this.eliminarAlumno();
      });
    }).catch(err=>{
      this.globalService.showError(err);
      console.log(err);
    })
  }

  buscarAlumno(){
    try {
      this.alumnoService.getAlumno(this.idAlumnoSeleccionado.toString()).subscribe(docente=>{
        if(docente!=null){
        this.alumno=docente as Alumno;
        this.inputNombreMode=true;
        }else{
        this.limpiar();
        
        }
      });
    } catch (error) {

     this.limpiar(); 
    }
  }

  eliminarAlumno(){
    this.alumnoService.removefromFirebase(this.alumno.id).then(res=>{
      console.log("Alumno "+this.alumno.nombres+" eliminado con exitó");
      this.limpiar();
    }).catch(er=>{
      console.error(er);
    })
  }

  limpiar(){
    this.alumno=new Alumno("","","","",null,null,"");
    this.inputNombreMode=false;
    this.idAlumnoSeleccionado="";
    this.recargarConsola();
  }

  recargarConsola(){
    this.textoTextarea="Lista de alumnos:"
    setTimeout(() => {
      this.cargarAlumnos();
  }, 500);
  }

  volver(){
    this.location.back();
  };

}
