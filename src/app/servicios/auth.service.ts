import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private angularFireAuth:AngularFireAuth) { }

  

  login(email:string,password:string,role:string){
    return new Promise((resolve,rejects) => {
      if(email==null||email==""||password==null||password==""||role==null||role==""){
        rejects("No deje campos vacios")
        }else{
        this.angularFireAuth.signInWithEmailAndPassword(email,password).then(user=>{resolve(user);}
        ).catch(err=>rejects(err));
        }
      
    });
  }

  createAccount(email:string,password:string|null,role:string){
   
    return new Promise((resolve,rejects) => {
      if(email==null||email==""||password==null||password==""||role==null||role==""){
      rejects("No deje campos vacios")
      }else{
        this.angularFireAuth.createUserWithEmailAndPassword(email,password).then(user=>{resolve(user);}
        ).catch(err=>rejects(err));
      }
    });  
  }

  

  
  
}