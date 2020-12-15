import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionAlumnosComponent } from './gestion-alumnos.component';

describe('GestionAlumnosComponent', () => {
  let component: GestionAlumnosComponent;
  let fixture: ComponentFixture<GestionAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionAlumnosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
