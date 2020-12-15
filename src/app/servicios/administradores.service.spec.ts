import { async, TestBed } from '@angular/core/testing';
import { AngularFireModule } from "@angular/fire";
import { AdministradoresService } from './administradores.service';
import { firebaseConfig } from "../../environments/environment";
import { Administrador } from '../models/administrador';



describe('AdministradoresService', () => {
  let service: AdministradoresService;

  

  beforeEach(() => {
    TestBed.configureTestingModule({

      imports: [
        AngularFireModule.initializeApp(firebaseConfig)
      ],
    }).compileComponents();
    service = TestBed.inject(AdministradoresService);
  });

   it('Debe crear un administrador', async () => {
     let respuesta:string="";
    await service.sendtoFirebase(new Administrador("123456789","Juan","Perez",31233118912,"prueba@gmail.com")).then(res=>{
      respuesta=res as string;
    }).catch(err=>{
      respuesta=err as string;
    })
    expect(respuesta).toEqual("ok");
  });

  it('Debe eliminar a un administrador', async () => {
    let respuesta:string="";
   await service.removefromFirebase("123456789").then(res=>{
     respuesta=res as string;
   }).catch(err=>{
     respuesta=err as string;
   })
   expect(respuesta).toEqual("ok");
 });
});
