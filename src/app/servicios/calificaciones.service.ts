import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionesService {

  
  collection:string = "Calificaciones";

  constructor(private db:AngularFirestore)  { }


  async sendtoFirebase(calificacion:Calificacion){
    const idGenerated=this.db.createId();
    return new Promise((resolve,rejects)=>{
      if(this.esVacio(calificacion)||calificacion.calificacion==null||calificacion.porcentaje==null){
        rejects("No deje campos vacios")
      }else{
        if(calificacion.calificacion<0||calificacion.calificacion>100||calificacion.porcentaje<1||calificacion.porcentaje>100){
          rejects("Valores númericos por fuera de rango")
        }else{
          this.db.collection(this.collection).doc(idGenerated).set({
            id:idGenerated,
            idAsignatura:calificacion.idAsignatura,
            idDocente:calificacion.idDocente,
            idAlumno:calificacion.idAlumno,
            idCurso:calificacion.idCurso,
            calificacion:calificacion.calificacion,
            periodo:calificacion.periodo,
            porcentaje:calificacion.porcentaje,
            comentario:calificacion.comentario,
            fecha_registro:Date.now()
          }).then(res=>{
            resolve("ok")
          }).catch(err=>{
            rejects("No se pudo guardar la asignatura\nError:"+err);
          })
        }
      }
    })
  }

  esVacio(calificacion:Calificacion){
    if(calificacion.idAlumno==null||calificacion.idAlumno==""||calificacion.idAsignatura==null
    ||calificacion.idAsignatura==""||calificacion.idDocente==null||calificacion.idDocente==""||
    calificacion.calificacion==0||calificacion.fecha_registro==null||calificacion.idCurso==""){
      return true;
    }else{
      return false;
    }
  }

  getCalificaciones(){
    return this.db.collection(this.collection).snapshotChanges().pipe(map(notas=>{
      return notas.map(a=>{
        const data = a.payload.doc.data() as Calificacion;
        data.id = a.payload.doc.id;
        return data;
      })
    }));}


    getCalificaciones_x_Asignatura(idAsignatura:string){
      return this.db.collection(this.collection,ref=>{return ref.where("idAsignatura","==",idAsignatura)}).snapshotChanges().pipe(map(notas=>{
        return notas.map(a=>{
          const data = a.payload.doc.data() as Calificacion;
          data.id = a.payload.doc.id;
          return data;
        })
      }));}

      
    getCalificaciones_x_Asignatura_x_Docente_x_Curso(idAsignatura:string|null,idDocente:string|null,idCurso:string|null){
      return this.db.collection(this.collection,ref=>{return ref.where("idAsignatura","==",idAsignatura).where("idDocente","==",idDocente).where("idCurso","==",idCurso)}).snapshotChanges().pipe(map(notas=>{
        return notas.map(a=>{
          const data = a.payload.doc.data() as Calificacion;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    
    }


       
    getCalificaciones_x_Asignatura_x_Alumno(idAsignatura:string|null,idAlumno:string|null){
      return this.db.collection(this.collection,ref=>{return ref.where("idAsignatura","==",idAsignatura).where("idA","==",idAlumno)}).snapshotChanges().pipe(map(notas=>{
        return notas.map(a=>{
          const data = a.payload.doc.data() as Calificacion;
          data.id = a.payload.doc.id;
          return data;
        })
      }));
    
    }



}
