import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-docente',
  templateUrl: './menu-docente.component.html',
  styleUrls: ['./menu-docente.component.css']
})
export class MenuDocenteComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }

  iraRegistrarNotas(){
    this.router.navigate(['registro-nota'])
  };
  
  iraConsultarNotas(){
    this.router.navigate(['lista-notas-docente'])
  };
  
  iraLogin(){
    this.router.navigate(['login']);
  }
}
