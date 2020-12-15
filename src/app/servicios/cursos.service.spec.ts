import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { Curso } from '../models/curso';

import { CursosService } from './cursos.service';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();
    service = TestBed.inject(CursosService);
  });

  it('Debe crear una curso', async () => {
    let respuesta:string="";
   await service.sendtoFirebase(new Curso("CURSOPRUEBA001","GRADOPRUEBA001","CURSO DE PRUEBA")).then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });

 it('Debe eliminar una curso', async () => {
   let respuesta:string="";
  await service.removefromFirebase(new Curso("CURSOPRUEBA001","GRADOPRUEBA001","CURSO DE PRUEBA")).then(res=>{
    respuesta=res as string;
  }).catch(err=>{
    respuesta=err as string;
  })
  expect(respuesta).toEqual("ok");
});
  
});
