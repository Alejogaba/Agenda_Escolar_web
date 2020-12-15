import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNotaAlumnoComponent } from './consulta-nota-alumno.component';

describe('ConsultaNotaAlumnoComponent', () => {
  let component: ConsultaNotaAlumnoComponent;
  let fixture: ComponentFixture<ConsultaNotaAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaNotaAlumnoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNotaAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
