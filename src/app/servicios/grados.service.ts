import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Grado } from '../models/grado';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GradosService {

  
  constructor(private db:AngularFirestore) { }

  getGrados(){
    return this.db.collection("Grados").snapshotChanges().pipe(map(grados=>{
      return grados.map(a=>{
        const data = a.payload.doc.data() as Grado;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getGrado(grado_id:string){
    return this.db.collection("Grados").doc(grado_id).valueChanges();
  }

/*
getGrado(grado_id:string):Grado{
  return new Grado("1","p");
}
*/

  sendtoFirebase(grado:Grado){
    return new Promise((resolve,rejects)=>{
      if(grado.nombre==null||grado.nombre==""){
        rejects("No deje campos vacios")
      }else{
        if(grado.nombre.length<5){
          rejects("Cantidad insuficiente de caracteres")
        }else{
           if(grado.id==null){
            this.db.collection("Grados").doc(this.db.createId()).set({
              nombre : grado.nombre,
            }).then(res=>{
              resolve("ok")
            }).catch(err=>{
              rejects("No se pudo guardar el grado\nError:"+err);
            })
            }else{
          this.db.collection("Grados").doc(grado.id).set({
            nombre : grado.nombre,
           }).then(res=>{
            resolve("ok")
          }).catch(err=>{
            rejects("No se pudo guardar el grado\nError:"+err);
          })
          }
        }  
      }
    })
  }

  sendtoFirebases(grado:Grado){
    return new Promise((resolve,rejects)=>{
      if(grado.nombre==null||grado.nombre==""){
        rejects("No deje campos vacios")
      }else{
        if(grado.nombre.length<5){
          rejects("Cantidad insuficiente de caracteres")
        }else{
           resolve("ok")
        }  
      }
    })
  }


  removefromFirebase(grado:Grado){
    return new Promise((resolve,rejects)=>{
      if(grado.id==null||grado.id==""||grado.nombre==null||grado.nombre==""){
        rejects("No deje campos vacios")
      }else{
        this.db.collection("Grados").doc(grado.id).delete().then(res=>{
          resolve("Se elimino correctamente el grado "+grado.nombre);
        }).catch(er=>{
          rejects("Ha ocurrido un error o el grado no existe");
        })
      }
    })
  }

  removefromFirebases(grado:Grado){
    return new Promise((resolve,rejects)=>{
      if(grado.id==null||grado.id==""||grado.nombre==null||grado.nombre==""){
        rejects("No deje campos vacios")
      }else{
        resolve("ok")
      }
    })
  }
}
