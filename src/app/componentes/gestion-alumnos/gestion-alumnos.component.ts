import { Component, OnInit } from '@angular/core';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { AlumnosService } from 'src/app/servicios/alumnos.service';
import { AuthService } from 'src/app/servicios/auth.service';
import {CursosService} from 'src/app/servicios/cursos.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-gestion-alumnos',
  templateUrl: './gestion-alumnos.component.html',
  styleUrls: ['./gestion-alumnos.component.css']
})
export class GestionAlumnosComponent implements OnInit {
  currentNumber:Number|null=null;
  idAlumnoSeleccionado:string="";
  listaAlumnos:any = [];
  inputNombreMode:boolean=false;
  alumno:Alumno=new Alumno("","","","",null,null,"");
  textoTextarea:string|null="Lista de alumnos:";

  constructor(private alumnoService:AlumnosService, private authService:AuthService,
     private usuarioService:UsuariosService, private location:Location, private globalService:GlobalService
     ) { }

  ngOnInit():void {

    this.limpiar();
    this.idAlumnoSeleccionado="";
    this.inputNombreMode=false;
  
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
    if(!this.inputNombreMode){
      this.alumnoService.sendtoFirebase(this.alumno).then(res=>{
        console.log("Se guardo el alumno con exitó");
        this.authService.createAccount(this.alumno.correo_electronico,this.alumno.id?.toString(),"alumno").then(res=>{
          console.log("Cuenta creada con exitó");
          this.usuarioService.sendtoFirebases(this.alumno.id,this.alumno.correo_electronico,this.alumno.id,"alumno").then(res=>{
            console.log("Se creo el usuario con exitó");
            this.limpiar();
            this.globalService.showSuccess("Se guardo el alumno con exitó");
            setTimeout(() => {
              this.globalService.showInfo("Credenciales para iniciar sesión:\n"+
              "Correo electrónico:"+this.alumno.correo_electronico+
              "\nContraseña:"+this.alumno.id+
              "\nPueden ser cambiadas luego de iniciar sesión")
          }, 3000);
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
      }).catch(err=>{
        console.log(err);
        this.globalService.showError(err);
      })
    }
   
  }

  buscarAlumno(){
    try {
      this.alumnoService.getAlumno(this.idAlumnoSeleccionado.toString()).subscribe(docente=>{
        if(docente!=null){
        this.alumno=docente as Alumno;
        this.inputNombreMode=true;
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
