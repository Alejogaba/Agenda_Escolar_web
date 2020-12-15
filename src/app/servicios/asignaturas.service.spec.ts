import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { Asignatura } from '../models/asignatura';

import { AsignaturasService } from './asignaturas.service';

describe('AsignaturasService', () => {
  let service: AsignaturasService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();
    service = TestBed.inject(AsignaturasService);
  });

  it('Debe crear una asignatura', async () => {
    let respuesta:string="";
   await service.sendtoFirebase(new Asignatura("ASIGNATURAPRUEBA001","ASIGNATURA DE PRUEBA")).then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });

 it('Debe eliminar una asignatura', async () => {
   let respuesta:string="";
  await service.removefromFirebase(new Asignatura("ASIGNATURAPRUEBA001","ASIGNATURA DE PRUEBA")).then(res=>{
    respuesta=res as string;
  }).catch(err=>{
    respuesta=err as string;
  })
  expect(respuesta).toEqual("ok");
});
  
});
