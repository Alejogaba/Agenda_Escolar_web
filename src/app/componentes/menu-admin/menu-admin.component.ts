import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  iraGestionGrados(){
    this.router.navigate(['gestion-grados'])
  };

  iraGestionCursos(){
    this.router.navigate(['gestion-cursos'])
  };

  iraLogin(){
    this.router.navigate(['login']);
  }

  iraGestionAsignatura(){
    this.router.navigate(['gestion-asignaturas'])
  };

  iraGestionAlumnos(){
    this.router.navigate(['gestion-alumnos'])
  };

  iraGestionDocentes(){
    this.router.navigate(['gestion-docentes'])
  };

  iraGestionAdministrador(){
    this.router.navigate(['gestion-administrador'])
  };

}
