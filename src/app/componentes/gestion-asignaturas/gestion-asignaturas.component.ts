import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Asignatura } from 'src/app/models/asignatura';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';
import { AngularFirePerformance } from '@angular/fire/performance';

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
    private globalService:GlobalService,private perfService:AngularFirePerformance) { }

  ngOnInit() {

    this.asignatura = new Asignatura(null,"");
    this.idAsignaturaSeleccionada="";
    this.inputNombreMode=false;
    this.cargarAsignaturas();
  
  }

  cargarAsignaturas() {
    this.asignaturaService.getAsignaturas().subscribe( async asignaturas=>{
      const trace = await this.perfService.trace("CargarAsignaturas");
      trace.start();
      this.listaAsignaturas = asignaturas;
      asignaturas.forEach(async element => {
        if(element.nombre!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.nombre;
      });
      trace.stop;
    },)
  }
  
  async guardarAsignatura(){
    const trace = await this.perfService.trace("Guardar asignatura");
    trace.start();
    await this.asignaturaService.sendtoFirebase(this.asignatura).then(res=>{
      console.log("Se guardo la asignatura con exitó");
      this.globalService.showSuccess("Se guardo la asignatura con exitó");
      this.limpiar();
    }).catch(err=>{
      this.globalService.showError(err);
      console.log(err);
    });
    trace.stop();
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

  async eliminarAsignatura(){
    const trace = await this.perfService.trace("Eliminar asignatura");
    trace.start();
    await this.asignaturaService.removefromFirebase(this.asignatura).then(res=>{
      console.log("Asignatura "+this.asignatura.nombre+" eliminado con exitó")
      this.globalService.showSuccess("Asignatura "+this.asignatura.nombre+" eliminado con exitó");
      this.limpiar();
    }).catch(er=>{
      this.globalService.showError(er);
      console.log(er);
    })
    trace.stop();
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
