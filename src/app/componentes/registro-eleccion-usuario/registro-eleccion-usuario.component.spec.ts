import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEleccionUsuarioComponent } from './registro-eleccion-usuario.component';

describe('RegistroEleccionUsuarioComponent', () => {
  let component: RegistroEleccionUsuarioComponent;
  let fixture: ComponentFixture<RegistroEleccionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroEleccionUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEleccionUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
