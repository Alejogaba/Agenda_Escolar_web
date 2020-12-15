import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarioDocenteComponent } from './registro-usuario-docente.component';

describe('RegistroUsuarioDocenteComponent', () => {
  let component: RegistroUsuarioDocenteComponent;
  let fixture: ComponentFixture<RegistroUsuarioDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuarioDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarioDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  
});
