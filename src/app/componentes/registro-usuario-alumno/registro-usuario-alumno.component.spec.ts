import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroUsuarioAlumnoComponent } from './registro-usuario-alumno.component';

describe('RegistroUsuarioAlumnoComponent', () => {
  let component: RegistroUsuarioAlumnoComponent;
  let fixture: ComponentFixture<RegistroUsuarioAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroUsuarioAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroUsuarioAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
