import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Asignatura } from '../models/asignatura';

@Injectable({
  providedIn: 'root'
})
export class AsignaturasService {

  
  constructor(private db:AngularFirestore)  { }

  getAsignaturas(){
    return this.db.collection("Asignaturas").snapshotChanges().pipe(map(asignaturas=>{
      return asignaturas.map(a=>{
        const data = a.payload.doc.data() as Asignatura;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getAsignatura(id_asignatura:string){
    return this.db.collection("Asignaturas").doc(id_asignatura).valueChanges();
  }


  sendtoFirebase(asignatura:Asignatura){
    return new Promise((resolve,rejects)=>{
      if(asignatura.nombre==null||asignatura.nombre==""){
        rejects("No deje campos vacios")
      }else{
        if(asignatura.nombre.length<5){
          rejects("Cantidad insuficiente de caracteres")
        }else{
           if(asignatura.id==null){
            this.db.collection("Asignaturas").doc(this.db.createId()).set({
              nombre : asignatura.nombre,
            }).then(res=>{
              resolve("ok")
            }).catch(err=>{
              rejects("No se pudo guardar la asignatura\nError:"+err);
            })
            }else{
          this.db.collection("Asignaturas").doc(asignatura.id).set({
            nombre : asignatura.nombre,
           }).then(res=>{
            resolve("ok")
          }).catch(err=>{
            rejects("No se pudo guardar el curso\nError:"+err);
          })
          }
        }  
      }
    })
  }

  sendtoFirebases(asignatura:Asignatura){
    return new Promise((resolve,rejects)=>{
      if(asignatura.nombre==null||asignatura.nombre==""){
        rejects("No deje campos vacios")
      }else{
        if(asignatura.nombre.length<5){
          rejects("Cantidad insuficiente de caracteres")
        }else{
           resolve("ok")
        }  
      }
    })
  }

  removefromFirebase(asignatura:Asignatura){
    return new Promise((resolve,rejects)=>{
      if(asignatura.id==null||asignatura.id==""||asignatura.nombre==null||asignatura.nombre==""){
        rejects("No deje campos vacios")
      }else{
        this.db.collection("Asignaturas").doc(asignatura.id).delete().then(res=>{
          resolve("Se elimino correctamente la asignatura "+asignatura.nombre);
        }).catch(er=>{
          rejects("La asignatura no existe");
        })
      }
    })
  }
}
