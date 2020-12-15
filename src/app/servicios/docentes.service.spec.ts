import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { Docente } from '../models/docente';

import { DocentesService } from './docentes.service';

describe('DocentesService', () => {
  let service: DocentesService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();
    service = TestBed.inject(DocentesService);
  });

  it('Debe crear un docente', async () => {
    let respuesta:string="";
   await service.sendtoFirebase(new Docente("123456781","ESPAÑOL","Camila","Contreras",new Date,31233118912,"prueba@gmail.com")).then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });

 it('Debe eliminar a un docente', async () => {
   let respuesta:string="";
  await service.removefromFirebase("123456781").then(res=>{
    respuesta=res as string;
  }).catch(err=>{
    respuesta=err as string;
  })
  expect(respuesta).toEqual("ok");
});

  
});
