import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/models/asignatura';
import { Docente } from 'src/app/models/docente';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { DocentesService } from 'src/app/servicios/docentes.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';


@Component({
  selector: 'app-gestion-docentes',
  templateUrl: './gestion-docentes.component.html',
  styleUrls: ['./gestion-docentes.component.css']
})
export class GestionDocentesComponent implements OnInit {
  currentNumber:Number|null=null;
  idDocenteSeleccionado:string="";
  listaAsignaturas:any = [];
  listaDocentes:any = [];
  inputNombreMode:boolean=false;
  docente:Docente=new Docente("","","","",null,null,"");
  asignatura:Asignatura=new Asignatura("","");
  textoTextarea:string|null="Lista de docentes:";

  constructor(private docenteService:DocentesService, private authService:AuthService,
     private asignaturasService:AsignaturasService,private usuarioService:UsuariosService,
     private location:Location,private globalService:GlobalService) { }

  ngOnInit():void {

    this.limpiar();
    this.idDocenteSeleccionado="";
    this.inputNombreMode=false;
    this.cargarAsignaturas();
  
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
      this.authService.createAccount(this.docente.correo_electronico,this.docente.id?.toString(),"docente").then(res=>{
        console.log("Cuenta creada con exitó");
        this.usuarioService.sendtoFirebases(this.docente.id,this.docente.correo_electronico,this.docente.id,"docente").then(res=>{
          console.log("Se creo el usuario con exitó");
          this.globalService.showSuccess("Docente creado con exitó");
          this.limpiar();
        }).catch(err=>{
          console.error(err)
          this.globalService.showError(err);
        });
      }).catch(err=>{
        console.error("Error al crear la cuenta: \n"+err);
        this.globalService.showError("Error al crear la cuenta: \n"+err);
        this.eliminarDocente();
      });
    }).catch(err=>{
      console.log(err);
      this.globalService.showError(err);
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
    this.globalService.showInfo("No se encontro el docente");
     this.limpiar(); 
    }
  }

  eliminarDocente(){
    this.docenteService.removefromFirebase(this.docente.id).then(res=>{
      console.log("Docente "+this.docente.nombres+" eliminado con exitó");
      this.globalService.showSuccess("Docente "+this.docente.nombres+" eliminado con exitó");
      this.limpiar();
    }).catch(er=>{
      this.globalService.showInfo(er);
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
