import { Component, OnInit } from '@angular/core';
import { AngularFirePerformance } from '@angular/fire/performance';
import { Router } from '@angular/router';
import { GoogleAnalyticsService } from 'mugan86-ng-google-analytics';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { GlobalService } from 'src/app/servicios/global.service';
import { UsuariosService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string="";
  password:string="";
  role:string="";
  userId:string="";
  show = false;
  colorToast="#f7f7f7";
  mensajeToast:string="";
  headerToast:string="";
  autohide = true;
  usuario:Usuario=new Usuario("","","","");
  
  constructor(private authService:AuthService, private performanceService:AngularFirePerformance, public router:Router,
    private usuarioService:UsuariosService,private globalService:GlobalService,public googleAnalyticsService: GoogleAnalyticsService) { 
     
    }

  ngOnInit() {
    this.usuario= new Usuario("","","","");
 
  }

  mostrarToast(encabezado:string,msj:string,tipo:number){
    this.show=true;
    this.mensajeToast=msj;
    this.headerToast=encabezado;
    switch (tipo) {
      case 0:
        this.colorToast="#d9534f";
        break;
      case 1:
        this.colorToast="#5cb85c";
        break;
      default:
        this.colorToast="#f7f7f7";
        break;
    }
    setTimeout(() => {
      this.show=false;
      }, 3000);
  }

  async onSubmitLogin(){
    console.info("Email: "+this.email);
    console.info("Rol: "+this.role);
    this.googleAnalyticsService.eventEmitter('Interactuar con un elemento', 'Click en iniciar sesión', 'Click en iniciar sesión', 1);
    if(false/*this.verificarRol(this.email,this.role)*/){
     // this.presentToastCustom(this.verificarRol(this.email,this.role),"danger");
    }else{
      this.authService.login(this.email,this.password,this.role).then( async res=>{
        this.performanceService.trace("Inicio de sesion");
        console.log("login");
        
          switch (this.role) {
            case "admin":
              this.router.navigate(['menu-admin']);
              this.globalService.showSuccess("Inicio de sesión correcto");
              break;
            case "docente":
             await this.getUsuario(this.email);
              setTimeout(() => {
                this.router.navigate(['menu-docente']);
                this.globalService.showSuccess("Inicio de sesión correcto");
                window.localStorage.setItem("idUser", this.usuario.id);
                 }, 500);
              
              break;
            case "alumno":
              await this.getUsuario(this.email);
              setTimeout(() => {
                this.router.navigate(['lista-notas-alumno']);
                this.globalService.showSuccess("Inicio de sesión correcto");
                window.localStorage.setItem("idUser", this.usuario.id)
                 }, 500);
              
              break;
            default:
              break;
          }
        
        
      }).catch((err: any)=>{console.info(err)
        this.globalService.showError(err);
      });
    }
  }

  iraRegistro(){
    this.router.navigate(['registro']);
  }

  onSubmitCreateUser(){
    this.authService.createAccount(this.email,this.password).then((res: any)=>{
      console.info("Cuenta creada con exito");
      this.usuarioService.sendtoFirebases("12345678",this.email,this.password,this.role);
    }).catch((err: any)=>{console.error("Hubo un error en los datos ingresados, no se pudo crear la cuenta");});
  }
/*
  verificarRol(email:string,rol:string):string{
    if(email==null||email==""||rol==null||rol==""){
      return "No deje campos vacios"
    }else{
      this.getUsuario(email).then(res=>{
        if(this.usuario.correo_electronico==email&&this.usuario.rol==rol){
          console.info("Correo y rol concuerdan");
          return "Correo y rol concuerdan";
        }else{
          console.info("Correo y rol no concuerdan");
          return "Correo y rol no concuerdan";
        }
      }).catch(err=>{
        return err;
      })
    }
  }
  */


  iraCrearCuenta(){
    this.router.navigate(['']);
  }
  
  async getUsuario(email:string){

    return new Promise((resolve,rejects)=>{
      this.usuarioService.buscarUsuario(email.toLowerCase()).subscribe(async usuario=>{
        if(usuario!=null){
          this.usuario = await usuario as Usuario;
          resolve("ok")
      }else{
        console.info("No se encontro el usuario");
        rejects("El usuario no existe");
      }
      });
    })
    
  }
}
