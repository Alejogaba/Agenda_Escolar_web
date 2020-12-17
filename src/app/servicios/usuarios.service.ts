import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  collectionName:string="Usuarios";

  constructor(private db:AngularFirestore)  { }

  getUsuario(correo_electronico:string){
    return this.db.collection(this.collectionName,ref=>{return ref.where("correo_electronico","==",correo_electronico)}).valueChanges();
  }
  

  
  buscarUsuario(id_docente:string){
    return this.db.collection(this.collectionName).doc(id_docente).valueChanges();
  }


  sendtoFirebases(id:string|null,correo_electronico:string|null,contrasena:string|null,rol:string){
    return new Promise((resolve,rejects)=>{
      if(id==null||correo_electronico==null||contrasena==null||rol==null){
        rejects("No deje campos vacios")
      }else{
        if(id.length<7||contrasena.length<4||correo_electronico.length<4){
          rejects("Cantidad incorrecta de caracteres")
        }else{
          this.db.collection(this.collectionName).doc(correo_electronico).set({
            id:id,
            correo_electronico: correo_electronico,
            contrasena: contrasena,
            rol: rol
           }).then(res=>{
            resolve("ok")
          }).catch(err=>{
            rejects("No se pudo guardar la cuenta\nError:"+err);
          })
        }
      }
    })
  }
}
