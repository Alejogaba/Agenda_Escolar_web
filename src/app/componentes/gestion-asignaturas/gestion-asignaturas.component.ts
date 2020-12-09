import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-gestion-asignaturas',
  templateUrl: './gestion-asignaturas.component.html',
  styleUrls: ['./gestion-asignaturas.component.css']
})
export class GestionAsignaturasComponent implements OnInit {

  idAsignaturaSeleccionada:string="";
  listaAsignaturas:any = [];
  inputNombreMode:boolean=false;
  textoTextarea:string|null="Lista de asignaturas:";
  asignatura:Asignatura=new Asignatura("","");


  constructor(private router:Router, private asignaturaService:AsignaturasService, private location:Location,
    private globalService:GlobalService) { }

  ngOnInit() {

    this.asignatura = new Asignatura(null,"");
    this.idAsignaturaSeleccionada="";
    this.inputNombreMode=false;
    this.cargarAsignaturas();
  
  }

  cargarAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe(asignaturas=>{
      this.listaAsignaturas = asignaturas;
      asignaturas.forEach(async element => {
        if(element.nombre!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.nombre;
      });
    })
  }
  
  guardarAsignatura(){
    this.asignaturaService.sendtoFirebase(this.asignatura).then(res=>{
      console.log("Se guardo la asignatura con exitó");
      this.globalService.showSuccess("Se guardo la asignatura con exitó");
      this.limpiar();
    }).catch(err=>{
      this.globalService.showError(err);
      console.log(err);
    })
  }

  seleccionAsignatura(){
    if(this.idAsignaturaSeleccionada==""){
      this.inputNombreMode=false;
      this.limpiar();
    }else{
      this.listaAsignaturas.forEach((element: Asignatura) => {
        if(element.id==this.idAsignaturaSeleccionada){
          this.asignatura=element;
        }
      });
      this.inputNombreMode=true;
    }
    
  }

  eliminarAsignatura(){
    this.asignaturaService.removefromFirebase(this.asignatura).then(res=>{
      
      console.log("Asignatura "+this.asignatura.nombre+" eliminado con exitó")
      this.globalService.showSuccess("Asignatura "+this.asignatura.nombre+" eliminado con exitó");
      this.limpiar();
    }).catch(er=>{
      this.globalService.showError(er);
      console.log(er);
    })
  }

  limpiar(){
    this.asignatura=new Asignatura(null,"");
    this.idAsignaturaSeleccionada="";
    this.inputNombreMode=false;
    this.listaAsignaturas=[];
    this.recargarConsola();
  }

  recargarConsola(){
    this.textoTextarea="Lista de asignaturas:"
    setTimeout(() => {
      this.cargarAsignaturas();
  }, 500);
  }

  volver(){
    this.location.back();
  };
}
