import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { Grado } from '../models/grado';

import { GradosService } from './grados.service';

describe('GradosService', () => {
  let service: GradosService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();
    service = TestBed.inject(GradosService);
  });
  it('Debe crear una asignatura', async () => {
    let respuesta:string="";
   await service.sendtoFirebase(new Grado("GRADOPRUEBA001","GRADO DE PRUEBA")).then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });

 it('Debe eliminar una grado', async () => {
   let respuesta:string="";
  await service.removefromFirebase(new Grado("GRADOPRUEBA001","GRADO DE PRUEBA")).then(res=>{
    respuesta=res as string;
  }).catch(err=>{
    respuesta=err as string;
  })
  expect(respuesta).toEqual("ok");
});

});
