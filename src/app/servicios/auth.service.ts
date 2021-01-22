import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private angularFireAuth:AngularFireAuth) { }

  

  login(email:string,password:string,role:string){
    return new Promise((resolve,rejects) => {
      if(this.hayCamposVacios(email,password,role)){
        rejects("No deje campos vacios")
        }else{
          if(!this.validarRol(email,role)){
            rejects("Este usuario no es un "+role);
          }else{
            this.angularFireAuth.signInWithEmailAndPassword(email,password).then(user=>{resolve(user);}
            ).catch(err=>rejects(err));
          }
        }
    });
  }



  hayCamposVacios(email:string,password:string|null,role:string|null){
    if(email==null||email==""||password==null||password==""||role==null||role==""){
      return true
    }else{
      return false
    }
  }

  validarRol(email:string,role:string){

    return true;
    
  }

  createAccount(email:string,password:string){
    return new Promise((resolve,rejects) => {
      if(this.hayCamposVacios(email,password,null)){
      rejects("No deje campos vacios")
      }else{
        this.angularFireAuth.createUserWithEmailAndPassword(email,password).then(user=>{resolve(user);}
        ).catch(err=>rejects(err));
      }
    });  
  }

  

  
  
}