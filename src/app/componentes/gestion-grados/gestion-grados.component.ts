import { Component, OnInit } from '@angular/core';
import { GradosService } from "../../servicios/grados.service";
import { Grado } from "../../models/grado";
import { CursosService } from 'src/app/servicios/cursos.service';
import { Curso } from 'src/app/models/curso';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';


@Component({
  selector: 'app-gestion-grados',
  templateUrl: './gestion-grados.component.html',
  styleUrls: ['./gestion-grados.component.css']
})
export class GestionGradosComponent implements OnInit {

 
  grados:Grado[]=[];
  grado:Grado=new Grado(null,"");
  gradoSeleccionado:Grado = new Grado(null,null);
  idgradoSeleccionado:string="";
  listaGrados:any = [];
  listaCursos:any = [];
  textoTextarea:string|null="Lista de grados:";
  inputNombreMode:boolean=false;
  

  constructor(private gradosService:GradosService,private cursoService:CursosService,
    private location:Location,private globalService:GlobalService) { }

  ngOnInit() {
    this.grado=new Grado(null,null);
    this.gradoSeleccionado=new Grado(null,"");
    this.idgradoSeleccionado="";
    this.inputNombreMode=false;

    this.grado= new Grado(null,"");
   
    this.cargarGrados();
   
  }

  cargarGrados() {
    this.gradosService.getGrados().subscribe(grados=>{
      this.listaGrados = grados;
      grados.forEach(element => {
        if(element.nombre!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.nombre;
      });
      
    })
  }

  cargarCursosdeGrado() {
    this.cursoService.getCursos_x_grado(this.idgradoSeleccionado).subscribe(cursos=>{
      this.listaCursos=cursos;
      cursos.forEach(element => {
        this.textoTextarea=this.textoTextarea+"\n"+element.nombre;
      });
    })
  }

  guardarGrado(){
    this.gradosService.sendtoFirebase(this.grado).then(res=>{
      console.log("Se guardo el grado con exitó");
      this.globalService.showSuccess("Se guardo el grado con exitó");
      this.limpiar();
    }).catch(err=>{
      this.globalService.showError(err);
      console.log(err);
    })
  }


  seleccionGrado(){
    console.log("SeleccionGrado()");
    if(this.idgradoSeleccionado==""){
      this.inputNombreMode=false;
      this.limpiar();
    }else{
      this.listaGrados.forEach((element: Grado) => {
        if(element.id==this.idgradoSeleccionado){
          this.grado=element;
        }
      });
      this.inputNombreMode=true;
      this.textoTextarea="Cursos del grado:"
       setTimeout(() => {
      this.cargarCursosdeGrado();
       }, 500);
    }
    
  }

  eliminarGrado(){
    this.gradosService.removefromFirebase(this.grado).then(res=>{
      console.log("Grado "+this.grado.nombre+" eliminado con exitó");
      this.globalService.showSuccess("Grado "+this.grado.nombre+" eliminado con exitó");
      this.listaCursos.forEach((element: Curso) => {
        this.cursoService.removefromFirebase(element);
      });
      this.limpiar();
    }).catch(er=>{
      this.globalService.showError(er);
      console.log(er);
    })
  }

  limpiar(){
    this.grado=new Grado(null,"");
    this.idgradoSeleccionado="";
    this.inputNombreMode=false;
    this.recargarConsola();
  }

  recargarConsola(){
    this.textoTextarea="Lista de grados:"
    setTimeout(() => {
      this.cargarGrados();
  }, 500);
  }
  

  volver(){
    this.location.back();
  };

}
