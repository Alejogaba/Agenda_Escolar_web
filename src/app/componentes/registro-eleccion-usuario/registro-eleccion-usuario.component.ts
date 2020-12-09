import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-eleccion-usuario',
  templateUrl: './registro-eleccion-usuario.component.html',
  styleUrls: ['./registro-eleccion-usuario.component.css']
})
export class RegistroEleccionUsuarioComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  iraLogin(){
    this.router.navigate(['login']);
  }

  iraRegistroDocente(){
    this.router.navigate(['registro-docente']);
  }
  iraRegistroAlumno(){
    this.router.navigate(['registro-alumno']);
  }
}
