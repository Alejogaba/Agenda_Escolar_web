import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Alumno } from '../models/alumno';
import { Docente } from '../models/docente';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

 
  collectionName:string="Docentes";

  constructor(private db:AngularFirestore)  { }

  getDocentes(){
    return this.db.collection(this.collectionName).snapshotChanges().pipe(map(docentes=>{
      return docentes.map(a=>{
        const data = a.payload.doc.data() as Docente;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getDocente(id_docente:string){
    return this.db.collection(this.collectionName).doc(id_docente).valueChanges();
  }

  buscarDocente(id_docente:string){
    return null;
  }


  sendtoFirebase(docente:Docente){
    return new Promise((resolve,rejects)=>{
      if(this.esVacio(docente)||docente.id==null||docente.telefono==null){
        rejects("No deje campos vacios")
      }else{
        if(docente.id.length<8||docente.nombres.length<4||docente.apellidos.length<4
          ||docente.telefono<10000000||docente.telefono>99999999999){
          rejects("Cantidad incorrecta de caracteres")
        }else{
          if(!this.validarEdad(docente.fecha_nacimiento)){
            rejects("Edad no válida")
          }else{
            if(!this.validarCorreo(docente.correo_electronico)){
              rejects("Por favor ingrese un correo válido")
            }else{
              if(this.buscarDocente(docente.id)!=null){
                rejects("Este docente ya existe");
              }else{
                this.db.collection(this.collectionName).doc(docente.id.toString()).set({
                  id: docente.id,
                  idAsignatura: docente.idAsignatura,
                  nombres: docente.nombres,
                  apellidos: docente.apellidos,
                  fecha_nacimiento: docente.fecha_nacimiento,
                  telefono: docente.telefono,
                  correo_electronico: docente.correo_electronico
                 }).then(res=>{
                  resolve("ok")
                }).catch(err=>{
                  rejects("No se pudo guardar el docente\nError:"+err);
                })
              }
            }
          }  
        }
      }
    })
  }

  esVacio(docente:Docente):boolean{
    if(docente.id==null||docente.id==""||docente.nombres==null||docente.nombres==""||docente.idAsignatura==null
    ||docente.fecha_nacimiento==null||docente.correo_electronico==""||docente.correo_electronico==null){
      return true
    }else{
      return false
    }
  }

  validarCorreo(correo:string):boolean{
    return true;
  }
  
  validarEdad(fecha:Date|null):boolean{
    return true
  }

  removefromFirebase(idDocente:String|null){
    return new Promise((resolve,rejects)=>{
      if(idDocente==null||idDocente==""){
        rejects("No deje campos vacios")
      }else{
        this.db.collection(this.collectionName).doc(idDocente.toString()).delete().then(res=>{
          resolve("ok");
        }).catch(er=>{
          rejects("El docente no existe");
        })
      }
    })
  }
}
