import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Alumno } from '../models/alumno';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

 
  collectionName:string="Alumnos";

  constructor(private db:AngularFirestore)  { }

  /*

  getCursos(){
    return this.db.collection("Cursos").snapshotChanges().pipe(map(cursos=>{
      return cursos.map(a=>{
        const data = a.payload.doc.data() as Curso;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  */
  getAlumnos(){
    return this.db.collection(this.collectionName).snapshotChanges().pipe(map(alumnos=>{
      return alumnos.map(a=>{
        const data = a.payload.doc.data() as Alumno;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getAlumnos_x_curso(idCurso:string){
    return this.db.collection(this.collectionName,ref=>{return ref.where("idCurso","==",idCurso)}).snapshotChanges().pipe(map(alumnos=>{
      return alumnos.map(a=>{
        const data = a.payload.doc.data() as Alumno;
        data.id = a.payload.doc.id;
        return data;
      })
    }))}

  getAlumno(id_alumno:string){
    return this.db.collection(this.collectionName).doc(id_alumno).valueChanges();
  }

  buscarAlumno(id_alumno:string){
    return null;
  }


  sendtoFirebase(alumno:Alumno){
    return new Promise((resolve,rejects)=>{
      if(this.esVacio(alumno.id)||alumno.telefono==null){
        rejects("No deje campos vacios")
      }else{
        if(alumno.id.length<8||alumno.nombres.length<4||alumno.apellidos.length<4
          ||alumno.telefono<10000000||alumno.telefono>99999999999){
          rejects("Cantidad incorrecta de caracteres")
        }else{
          if(!this.validarEdad(alumno.fecha_nacimiento)){
            rejects("Edad no válida")
          }else{
            if(!this.validarCorreo(alumno.correo_electronico)){
              rejects("Por favor ingrese un correo válido")
            }else{
              if(this.buscarAlumno(alumno.id)!=null){
                rejects("Ya existe un alumno con ese numero de identificación");
              }else{
                this.db.collection("Alumnos").doc(alumno.id.toString()).set({
                  id: alumno.id,
                  idCurso: alumno.idCurso,
                  nombres: alumno.nombres,
                  apellidos: alumno.apellidos,
                  edad: alumno.fecha_nacimiento,
                  telefono: alumno.telefono,
                  correo_electronico: alumno.correo_electronico
                 }).then(res=>{
                  resolve("ok")
                }).catch(err=>{
                  rejects("No se pudo guardar el alumno\nError:"+err);
                })
              }
            }
          }  
        }
      }
    })
  }


  sendtoFirebases(alumno:Alumno){
    return new Promise((resolve,rejects)=>{
      if(this.esVacio(alumno.id)||alumno.telefono==null||alumno.fecha_nacimiento==null){
        rejects("No deje campos vacios")
      }else{
        if(alumno.id.length<8||alumno.nombres.length<4||alumno.apellidos.length<4
          ||alumno.telefono<10000000||alumno.telefono>99999999999){
          rejects("Cantidad incorrecta de caracteres")
        }else{
          if(!this.validarEdad(alumno.fecha_nacimiento)){
            rejects("Edad no válida")
          }else{
            if(!this.validarCorreo(alumno.correo_electronico)){
              rejects("Por favor ingrese un correo válido")
            }else{
              resolve("ok");
            }
          }  
        }
      }
    })
  }

  esVacio(id:String):boolean{
    if(id==null||id==""){
      return true
    }else{
      return false
    }
  }

  validarCorreo(correo:string):boolean{
    return true;
  }
  
  validarEdad(edad:string|null):boolean{
    return true;
  }

  removefromFirebase(idAlumno:String){
    return new Promise((resolve,rejects)=>{
      if(this.esVacio(idAlumno)){
        rejects("No deje campos vacios")
      }else{
        this.db.collection(this.collectionName).doc(idAlumno.toString()).delete().then(res=>{
          resolve("ok");
        }).catch(er=>{
          rejects("El alumno no existe");
        })
      }
    })
  }
}
