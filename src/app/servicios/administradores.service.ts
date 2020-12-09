import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Administrador } from '../models/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradoresService {

  collectionName:string="Administradores";

  constructor(private db:AngularFirestore)  { }

  getAdministradores(){
    return this.db.collection(this.collectionName).snapshotChanges().pipe(map(docentes=>{
      return docentes.map(a=>{
        const data = a.payload.doc.data() as Administrador;
        data.id = a.payload.doc.id;
        return data;
      })
    }))
  }

  getAdministrador(id_administrador:string){
    return this.db.collection(this.collectionName).doc(id_administrador).valueChanges();
  }


  sendtoFirebase(administrador:Administrador){
    return new Promise((resolve,rejects)=>{
      if(this.esVacio(administrador)||administrador.id==null||administrador.telefono==null
      ||administrador.nombres==null||administrador.apellidos==null||administrador.correo_electronico==null){
        rejects("No deje campos vacios")
      }else{
        if(administrador.id.length<8||administrador.nombres.length<4||administrador.apellidos.length<4
          ||administrador.telefono<10000000||administrador.telefono>99999999999){
          rejects("Cantidad incorrecta de caracteres")
        }else{
          if(false){
            rejects("Edad no válida")
          }else{
            if(!this.validarCorreo(administrador.correo_electronico)){
              rejects("Por favor ingrese un correo válido")
            }else{
              this.db.collection(this.collectionName).doc(administrador.id.toString()).set({
                id: administrador.id,
                nombres: administrador.nombres,
                apellidos: administrador.apellidos,
                telefono: administrador.telefono,
                correo_electronico: administrador.correo_electronico
               }).then(res=>{
                resolve("ok")
              }).catch(err=>{
                rejects("No se pudo guardar el administrador\nError:"+err);
              })
            }
          }  
        }
      }
    })
  }

  esVacio(administrador:Administrador):boolean{
    if(administrador.id==null||administrador.id==""||administrador.nombres==null||administrador.nombres==""
    ||administrador.correo_electronico==""||administrador.correo_electronico==null){
      return true
    }else{
      return false
    }
  }

  validarCorreo(correo:string):boolean{
    return true;
  }
  
  validarEdad(edad:number):boolean{
    if(edad>=18&&edad<=90){
      return true;
    }else{
      return false;
    }
  }

  removefromFirebase(idAdministrador:string|null){
    return new Promise((resolve,rejects)=>{
      if(idAdministrador==null||idAdministrador.trim()==""){
        rejects("No deje campos vacios")
      }else{
        this.db.collection(this.collectionName).doc(idAdministrador).delete().then(res=>{
          resolve("ok");
        }).catch(er=>{
          rejects("El administrador no existe");
        })
      }
    })
  }
}
