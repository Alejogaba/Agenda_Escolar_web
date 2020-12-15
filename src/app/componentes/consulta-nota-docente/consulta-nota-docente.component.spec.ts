import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaNotaDocenteComponent } from './consulta-nota-docente.component';

describe('ConsultaNotaDocenteComponent', () => {
  let component: ConsultaNotaDocenteComponent;
  let fixture: ComponentFixture<ConsultaNotaDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsultaNotaDocenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultaNotaDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

 
});
