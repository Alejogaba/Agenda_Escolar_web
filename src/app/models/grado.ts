import { Injectable } from '@angular/core';
import { resolve } from 'dns';
import { promise } from 'protractor';

export class Grado {

    id:string|null;
    nombre:string|null;

    constructor(id:string|null,nombre:string|null){
        this.id=id;
        this.nombre=nombre;
    }
}
