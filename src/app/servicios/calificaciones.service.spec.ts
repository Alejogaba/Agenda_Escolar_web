import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { firebaseConfig } from 'src/environments/environment';
import { Calificacion } from '../models/calificacion';

import { CalificacionesService } from './calificaciones.service';

describe('CalificacionesService', () => {
  let service: CalificacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();TestBed.configureTestingModule({});
    service = TestBed.inject(CalificacionesService);
  });

  it('Debe registrar una calificación', async () => {
    let respuesta:string="";
   await service.sendtoFirebase(new Calificacion("ASIGNATURAPRUEBA001","123456780","123456781","CURSOPRUEBA001",100,100,1,"Examen")).then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });
  
});
