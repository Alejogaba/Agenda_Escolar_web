import { Component, OnInit } from '@angular/core';
import { Asignatura } from 'src/app/models/asignatura';
import { Docente } from 'src/app/models/docente';
import { AsignaturasService } from 'src/app/servicios/asignaturas.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { DocentesService } from 'src/app/servicios/docentes.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';
import { AngularFirePerformance } from '@angular/fire/performance';


@Component({
  selector: 'app-gestion-docentes',
  templateUrl: './gestion-docentes.component.html',
  styleUrls: ['./gestion-docentes.component.css']
})
export class GestionDocentesComponent implements OnInit {
  currentNumber:Number|null=null;
  idDocenteSeleccionado:string="";
  idAsignaturaSeleccionada:string="";
  listaAsignaturas:any = [];
  listaDocentes:any = [];
  listaAsignaturas_de_Docente:any =[];
  inputNombreMode:boolean=false;
  docente:Docente=new Docente("","","","",null,null,"");
  asignatura:Asignatura=new Asignatura("","");
  textoTextarea:string|null="Lista de docentes:";

  constructor(private docenteService:DocentesService, private tracerService:AngularFirePerformance, private authService:AuthService,
     private asignaturasService:AsignaturasService,private usuarioService:UsuariosService,
     private location:Location,private globalService:GlobalService) { }

  ngOnInit():void {

    this.limpiar();
    this.idDocenteSeleccionado="";
    this.inputNombreMode=false;
    this.cargarAsignaturas();
  
  }

  cargarAsignaturas() {
    this.asignaturasService.getAsignaturas().subscribe(asignaturas=>{
      this.listaAsignaturas = asignaturas;
    })
  }


  async cargarDocentes() {
    const trace = await this.tracerService.trace("Cargar docentes");
    trace.start();
    await this.docenteService.getDocentes().subscribe(docentes=>{
      this.listaDocentes = docentes;
      docentes.forEach(element => {
        if(element.nombres!=null&&element.id!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.id+" | "+element.nombres+" "+element.apellidos;
      });
    })
    trace.stop();
  }

  cargarAsignaturasdeDocente() {
    this.asignaturasService.getAsignaturas_x_Docente(this.idDocenteSeleccionado).subscribe(asignaturas=>{
      this.listaAsignaturas_de_Docente=asignaturas;
      asignaturas.forEach(element => {
        this.textoTextarea=this.textoTextarea+"\n"+element.nombre;
      });
    })
  }

  async asignarAsignatura(){
    const trace = await this.tracerService.trace("Asignar asignatura");
    trace.start();
    await this.asignaturasService.sendtoFirebaseAsignaturaxDocente(this.idAsignaturaSeleccionada,this.docente.id).then(res=>{
      console.log("Se asigno la asignatura con exitó");
      this.globalService.showSuccess("Se asigno correctamente "+this.asignatura.nombre+" al docente");
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
  
  async guardarDocente(){
    if(!this.inputNombreMode){
      const trace = await this.tracerService.trace("Guardar docente");
      trace.start();
      await this.docenteService.sendtoFirebase(this.docente).then(res=>{
        console.log("Se guardo el docente con exitó");
        this.authService.createAccount(this.docente.correo_electronico,this.docente.id?.toString()).then(res=>{
          console.log("Cuenta creada con exitó");
          this.usuarioService.sendtoFirebases(this.docente.id,this.docente.correo_electronico,this.docente.id,"docente").then(res=>{
            console.log("Se creo el usuario con exitó");
            this.globalService.showSuccess("Docente creado con exitó");
            setTimeout(() => {
              this.globalService.showInfo("Puede iniciar sesión con el correo electronico e identificación como contraseña")
          }, 1000);
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
      trace.stop();
    }else{
      const trace = await this.tracerService.trace("Modificar docente");
      trace.start();
      await this.docenteService.sendtoFirebase(this.docente).then(res=>{
        console.log("Se guardo el docente con exitó");
        this.globalService.showSuccess("Se modifico el docente con exitó");
      }).catch(err=>{
        console.log(err);
        this.globalService.showError(err);
      })
      trace.stop();
    }
    


    
  }

  buscarDocente(){
    try {
      this.docenteService.getDocente(this.idDocenteSeleccionado.toString()).subscribe(docente=>{
        if(docente!=null){
        this.docente=docente as Docente;
        this.inputNombreMode=true;
      this.textoTextarea="Asignaturas que dicta este docente:"
       setTimeout(() => {
      this.cargarAsignaturasdeDocente();
       }, 500);
        }else{
          this.globalService.showInfo("No se encontro el docente");
        }
      });
    } catch (error) {
    this.globalService.showInfo("No se encontro el docente");
     this.limpiar(); 
    }
  }

  async eliminarDocente(){
    const trace = await this.tracerService.trace("Eliminar docente");
    trace.start();
    await this.docenteService.removefromFirebase(this.docente.id).then(res=>{
      console.log("Docente "+this.docente.nombres+" eliminado con exitó");
      this.globalService.showSuccess("Docente "+this.docente.nombres+" eliminado con exitó");
      this.limpiar();
    }).catch(er=>{
      this.globalService.showInfo(er);
      console.error(er);
    })
    trace.stop();
  }

  limpiar(){
    this.docente=new Docente("","","","",null,null,"");
    this.inputNombreMode=false;
    this.idDocenteSeleccionado="";
    this.idAsignaturaSeleccionada="";
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
