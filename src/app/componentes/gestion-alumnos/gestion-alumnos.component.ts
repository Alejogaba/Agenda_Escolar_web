import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import {CursosService} from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {formatDate, Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.css']
})
export class GestionAlumnosComponent implements OnInit {
  currentNumber:Number|null=null;
  idAlumnoSeleccionado:string="";
  listaAlumnos:any = [];
  listaCursos:any = [];
  isHidden=false;
  inputNombreMode:boolean=false;
  alumno:Alumno=new Alumno("","","","",null,null,"");
  textoTextarea:string|null="Lista de alumnos:";

  constructor(private alumnoService:AlumnosService, private authService:AuthService,
    private cursoService:CursosService,private usuarioService:UsuariosService, private location:Location, private globalService:GlobalService
     ) { }

  ngOnInit():void {

    this.limpiar();
    this.idAlumnoSeleccionado="";
    this.inputNombreMode=false;
    this.cargarCursos();
  
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
  

  cargarCursos() {
    this.cursoService.getCursos().subscribe(cursos=>{
      this.listaCursos = cursos;
    })
  }

  guardarAlumno(){
    if(!this.inputNombreMode){
      this.alumnoService.sendtoFirebase(this.alumno).then(res=>{
        console.log("Se guardo el alumno con exitó");
        this.authService.createAccount(this.alumno.correo_electronico,this.alumno.id?.toString()).then(res=>{
          console.log("Cuenta creada con exitó");
          this.usuarioService.sendtoFirebases(this.alumno.id,this.alumno.correo_electronico,this.alumno.id,"alumno").then(res=>{
            console.log("Se creo el usuario con exitó");
            this.limpiar();
            this.globalService.showSuccess("Se guardo el alumno con exitó");
            setTimeout(() => {
              this.globalService.showInfo("Puede iniciar sesión con el correo electronico e identificación como contraseña")
          }, 1000);
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
        console.log(err);
        this.globalService.showError(err);
      })
    }else{
      this.alumnoService.sendtoFirebase(this.alumno).then(res=>{
        console.log("Se actualizo el alumno con exitó");
        this.globalService.showSuccess("Se actualizon el alumno con exitó");
      }).catch(err=>{
        console.log(err);
        this.globalService.showError(err);
      })
    }
   
  }

  buscarAlumno(){
    try {
      this.alumnoService.getAlumno(this.idAlumnoSeleccionado.toString()).subscribe(alumno=>{
        if(alumno!=null){
        this.alumno=alumno as Alumno;
        this.inputNombreMode=true;
        this.textoTextarea="Datos del alumno"
    setTimeout(() => {
      this.textoTextarea="Nombre: "+this.alumno.nombres+" "+this.alumno.apellidos+"\n"+
      "Identificación: "+this.alumno.id+"\n"+
      "Fecha de nacimiento: "+this.alumno.fecha_nacimiento;
         }, 500);
        }else{
        this.globalService.showInfo("No se encontro el alumno");
        }
      });
    } catch (error) {
      this.globalService.showInfo("Alumno no encontrado");
     this.limpiar(); 
    }
  }

  eliminarAlumno(){
    this.alumnoService.removefromFirebase(this.alumno.id).then(res=>{
      console.log("Alumno "+this.alumno.nombres+" eliminado con exitó");
      this.limpiar();
      this.globalService.showSuccess("Alumno "+this.alumno.nombres+" eliminado con exitó");
    }).catch(er=>{
      this.globalService.showError(er);
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
