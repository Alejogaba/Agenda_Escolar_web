import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { Alumno } from '../models/alumno';

import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();
    service = TestBed.inject(AlumnosService);
  });
  it('Debe crear un alumno', async () => {
    let respuesta:string="";
   await service.sendtoFirebase(new Alumno("123456780","CURSO_A","Carlos","Mendoza",new Date,31233118912,"prueba@gmail.com")).then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });

 it('Debe eliminar a un alumno', async () => {
   let respuesta:string="";
  await service.removefromFirebase("123456780").then(res=>{
    respuesta=res as string;
  }).catch(err=>{
    respuesta=err as string;
  })
  expect(respuesta).toEqual("ok");
});
  
});
