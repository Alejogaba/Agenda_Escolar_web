import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/models/asignatura';
import { Docente } from 'src/app/models/docente';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { DocentesService } from 'src/app/servicios/docentes.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { NgbInputDatepicker, NgbInputDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-registro-usuario-docente',
  templateUrl: './registro-usuario-docente.component.html',
  styleUrls: ['./registro-usuario-docente.component.css']
})
export class RegistroUsuarioDocenteComponent implements OnInit {
  idDocenteSeleccionado:string="";
  listaAsignaturas:any = [];
  listaDocentes:any = [];
  password:string="";
  minDate:any = {year: 1900, month: 1, day: 1};
  maxDate:any = {year:2150,month:12,day:12};
  currentDate:Date = new Date;
  inputNombreMode:boolean=false;
  docente:Docente=new Docente("","","","",null,null,"");
  asignatura:Asignatura=new Asignatura("","");
  textoTextarea:string|null="Lista de docentes:";

  constructor(private docenteService:DocentesService, private authService:AuthService,
     private asignaturasService:AsignaturasService,private usuarioService:UsuariosService,
     private location:Location,private config:NgbInputDatepickerConfig,private router:Router,
     private globalService:GlobalService) { 
      
      config.minDate = {year: 1900, month: 1, day: 1};
      config.maxDate = {year:this.currentDate.getFullYear(),month:this.currentDate.getMonth(),day:this.currentDate.getDay()}
     }

  ngOnInit():void {

    this.limpiar();
    this.idDocenteSeleccionado="";
    this.inputNombreMode=false;
    this.cargarAsignaturas();
    this.maxDate={year:this.currentDate.getFullYear(),month:this.currentDate.getMonth(),day:this.currentDate.getDay()};
  
  }

  cargarAsignaturas() {
    this.asignaturasService.getAsignaturas().subscribe(cursos=>{
      this.listaAsignaturas = cursos;
    })
  }

  cargarDocentes() {
    this.docenteService.getDocentes().subscribe(docentes=>{
      this.listaDocentes = docentes;
      docentes.forEach(element => {
        if(element.nombres!=null&&element.id!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.id+" | "+element.nombres+" "+element.apellidos;
      });
    })
  }
  
  guardarDocente(){
    this.docenteService.sendtoFirebase(this.docente).then(res=>{
      console.log("Se guardo el docente con exitó");
      this.authService.createAccount(this.docente.correo_electronico,this.password.toString(),"docente").then(res=>{
        console.log("Cuenta creada con exitó");
        this.usuarioService.sendtoFirebases(this.docente.id,this.docente.correo_electronico,this.password,"docente").then(res=>{
          console.log("Se creo el usuario con exitó");
          this.limpiar();
          this.globalService.showSuccess("Cuenta creada con exitó, redirigiendo al inicio...")
          setTimeout(() => {
            this.router.navigate(['login'])
        }, 2000);
        }).catch(err=>{
          this.globalService.showError(err);
          console.error(err)
        });
      }).catch(err=>{
        this.globalService.showError("Error al crear la cuenta: \n"+err);
        console.error("Error al crear la cuenta: \n"+err);
        this.eliminarDocente();
      });
    }).catch(err=>{
      this.globalService.showError(err);
      console.log(err);
    })
  }

  buscarDocente(){
    try {
      this.docenteService.getDocente(this.idDocenteSeleccionado.toString()).subscribe(docente=>{
        if(docente!=null){
        this.docente=docente as Docente;
        this.inputNombreMode=true;
        }else{
        this.limpiar();
        
        }
      });
    } catch (error) {
     this.limpiar(); 
    }
  }

  eliminarDocente(){
    this.docenteService.removefromFirebase(this.docente.id).then(res=>{
      console.log("Docente "+this.docente.nombres+" eliminado con exitó");
      this.limpiar();
    }).catch(er=>{
      console.error(er);
    })
  }

  limpiar(){
    this.docente=new Docente("","","","",null,null,"");
    this.inputNombreMode=false;
    this.idDocenteSeleccionado="";
    this.recargarConsola();
  }

  recargarConsola(){
    this.textoTextarea="Lista de docentes:"
    setTimeout(() => {
      this.cargarDocentes();
      
  }, 500);
  }

  volver(){
    this.location.back();
  };
}
