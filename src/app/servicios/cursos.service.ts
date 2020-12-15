import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private db:AngularFirestore)  { }

  
  getCursos(){
    return this.db.collection("Cursos").snapshotChanges().pipe(map(cursos=>{
      return cursos.map(a=>{
        const data = a.payload.doc.data() as Curso;
        data.id = a.payload.doc.id;
        return data;
      })
    }))}


    getCursos_x_grado(idGrado:string){
      return this.db.collection("Cursos",ref=>{return ref.where("id_grado","==",idGrado)}).snapshotChanges().pipe(map(cursos=>{
        return cursos.map(a=>{
          const data = a.payload.doc.data() as Curso;
          data.id = a.payload.doc.id;
          return data;
        })
      }))}
  

  getCurso(curso_id:string){
    return this.db.collection("Cursos").doc(curso_id).valueChanges();
  }


  sendtoFirebase(curso:Curso){
    return new Promise((resolve,rejects)=>{
      if(curso.id_grado==null||curso.id_grado==""||curso.nombre==null||curso.nombre==""){
        rejects("No deje campos vacios")
      }else{
        if(curso.nombre.length<5){
          rejects("Cantidad insuficiente de caracteres")
        }else{
           if(curso.id==null){
            this.db.collection("Cursos").doc(this.db.createId()).set({
              id_grado: curso.id_grado,
              nombre : curso.nombre,
            }).then(res=>{
              resolve("ok")
            }).catch(err=>{
              rejects("No se pudo guardar el curso\nError:"+err);
            })
            }else{
          this.db.collection("Cursos").doc(curso.id).set({
            id_grado: curso.id_grado,
            nombre : curso.nombre,
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

  
  sendtoFirebases(curso:Curso){
    return new Promise((resolve,rejects)=>{
      if(curso.id_grado==null||curso.id_grado==""||curso.nombre==null||curso.nombre==""){
        rejects("No deje campos vacios")
      }else{
        if(curso.nombre.length<5){
          rejects("Cantidad insuficiente de caracteres")
        }else{
           resolve("ok")
        }
      }
    })
  }

  removefromFirebase(curso:Curso){
    return new Promise((resolve,rejects)=>{
      if(curso.id==null||curso.id.trim()==""||curso.id_grado==null||curso.nombre==null
      ||curso.nombre.trim()==""){
        rejects("No deje campos vacios")
      }else{
        this.db.collection("Cursos").doc(curso.id).delete().then(res=>{
          resolve("ok");
        }).catch(er=>{
          rejects("El curso no existe");
        })
      }
    })
  }

  removefromFirebase_x_grado(idGrado:string){
    return new Promise((resolve,rejects)=>{
        this.db.collection("Cursos",ref=>{return ref.where("id_grado","==",idGrado)}).doc().delete().then(res=>{
          resolve("Se eliminaron los cursos relacionados");
        }).catch(er=>{
          rejects("El curso no existe");
        })
    })
  }
}
