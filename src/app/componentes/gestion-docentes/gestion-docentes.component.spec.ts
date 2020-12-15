import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDocentesComponent } from './gestion-docentes.component';

describe('GestionDocentesComponent', () => {
  let component: GestionDocentesComponent;
  let fixture: ComponentFixture<GestionDocentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionDocentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionDocentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


});
