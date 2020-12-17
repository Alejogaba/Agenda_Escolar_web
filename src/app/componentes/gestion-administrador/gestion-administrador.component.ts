import { Component, OnInit, ValueSansProvider } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Administrador } from 'src/app/models/administrador';
import { AdministradoresService } from 'src/app/servicios/administradores.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';
import {Location} from '@angular/common';
import { GlobalService } from 'src/app/servicios/global.service';

@Component({
  selector: 'app-gestion-administrador',
  templateUrl: './gestion-administrador.component.html',
  styleUrls: ['./gestion-administrador.component.css']
})
export class GestionAdministradorComponent implements OnInit {
  currentNumber:Number|null=null;
  idAdministradorSeleccionado:string="";
  listaAsignaturas:any = [];
  listaAdministradores:any = [];
  password:string="";
  inputNombreMode:boolean=false;
  administrador:Administrador=new Administrador("","","",null,"");
  textoTextarea:string|null="Lista de coordinadores:";
  

  constructor(private administradorService:AdministradoresService, private authService:AuthService,
     private usuarioService:UsuariosService, private location:Location, private globalService:GlobalService
     ) { }

  ngOnInit():void {

    this.limpiar();
    this.idAdministradorSeleccionado="";
    this.inputNombreMode=false;
  
  }


  cargarAdministradores() {
    this.administradorService.getAdministradores().subscribe(administrador=>{
      this.listaAdministradores = administrador;
      administrador.forEach(element => {
        if(element.nombres!=null&&element.id!=null)
        this.textoTextarea=this.textoTextarea+"\n"+element.id+" | "+element.nombres+" "+element.apellidos;
      });
    })
  }
  
  guardarAdministrador(){
    if(!this.inputNombreMode){
      this.administradorService.sendtoFirebase(this.administrador).then(res=>{
        console.log("Se guardo el coordinador con exitó");
        this.authService.createAccount(this.administrador.correo_electronico,this.password?.toString(),"admin").then(res=>{
          console.log("Cuenta creada con exitó");
          this.usuarioService.sendtoFirebases(this.administrador.id,this.administrador.correo_electronico,this.administrador.id,"admin").then(res=>{
            console.log("Se creo el usuario con exitó");
            this.globalService.showSuccess("Se guardo el coordinador con exitó");
            setTimeout(() => {
              this.globalService.showInfo("Credenciales para iniciar sesión:\n"+
              "Correo electrónico:"+this.administrador.correo_electronico+
              "\nContraseña:"+this.password)
          }, 3000);
            this.limpiar();
          }).catch(err=>{
            console.error(err)
            this.globalService.showError("Error al crear la cuenta:\n"+err);
          });
        }).catch(err=>{
          console.error("Error al crear la cuenta: \n"+err);
          this.globalService.showError("Error al crear la cuenta:\n"+err);
          this.eliminarAdministrador();
        });
      }).catch(err=>{
        this.globalService.showError(err);
        console.log(err);
      })
    }else{
      this.administradorService.sendtoFirebase(this.administrador).then(res=>{
        console.log("Se guardo el coordinador con exitó");
        this.globalService.showSuccess("Se modifico el coordinador con exitó");
      }).catch(err=>{
        this.globalService.showError(err);
        console.log(err);
      })
    }
    
  }

  buscarAdministrador(){
    try {
      this.administradorService.getAdministrador(this.idAdministradorSeleccionado.toString()).subscribe(administrador=>{
        if(administrador!=null){
        this.administrador=administrador as Administrador;
        this.inputNombreMode=true;
        }else{
        this.globalService.showInfo("No se encontro el coordinador");
        
        }
      });
    } catch (error) {
    this.globalService.showInfo(error);
     this.limpiar(); 
    }
  }

  eliminarAdministrador(){
    this.administradorService.removefromFirebase(this.administrador.id).then(res=>{
      console.log("Administrador "+this.administrador.nombres+" eliminado con exitó");
      this.limpiar();
      this.globalService.showError("Coordinador "+this.administrador.nombres+" eliminado con exitó");
    }).catch(er=>{
      this.globalService.showError(er);
      console.error(er);
    })
  }

  limpiar(){
    this.administrador=new Administrador("","","",null,"");
    this.inputNombreMode=false;
    this.idAdministradorSeleccionado="";
    this.recargarConsola();
  }

  recargarConsola(){
    this.textoTextarea="Lista de coordinadores:"
    setTimeout(() => {
      this.cargarAdministradores();
  }, 500);


  }

  volver(){
    this.location.back();
  };

}
