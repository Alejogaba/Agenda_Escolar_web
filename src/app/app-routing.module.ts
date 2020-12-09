import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultaNotaAlumnoComponent } from './componentes/consulta-nota-alumno/consulta-nota-alumno.component';
import { ConsultaNotaDocenteComponent } from './componentes/consulta-nota-docente/consulta-nota-docente.component';
import { GestionAdministradorComponent } from './componentes/gestion-administrador/gestion-administrador.component';
import { GestionAlumnosComponent } from './componentes/gestion-alumnos/gestion-alumnos.component';
import { GestionAsignaturasComponent } from './componentes/gestion-asignaturas/gestion-asignaturas.component';
import { GestionCursosComponent } from './componentes/gestion-cursos/gestion-cursos.component';
import { GestionDocentesComponent } from './componentes/gestion-docentes/gestion-docentes.component';
import { GestionGradosComponent } from './componentes/gestion-grados/gestion-grados.component';
import { LoginComponent } from './componentes/login/login.component';
import {MenuAdminComponent} from './componentes/menu-admin/menu-admin.component';
import { MenuDocenteComponent } from './componentes/menu-docente/menu-docente.component';
import { RegistroEleccionUsuarioComponent } from './componentes/registro-eleccion-usuario/registro-eleccion-usuario.component';
import { RegistroNotaComponent } from './componentes/registro-nota/registro-nota.component';
import { RegistroUsuarioAlumnoComponent } from './componentes/registro-usuario-alumno/registro-usuario-alumno.component';
import { RegistroUsuarioDocenteComponent } from './componentes/registro-usuario-docente/registro-usuario-docente.component';


const routes: Routes = [{path: '',
redirectTo: 'login',
pathMatch: 'full'},
{
  path: 'login', component: LoginComponent
},
{
  path: 'registro', component: RegistroEleccionUsuarioComponent
},
{
  path: 'registro-docente', component: RegistroUsuarioDocenteComponent
},
{
  path: 'registro-alumno', component: RegistroUsuarioAlumnoComponent
},
{
  path: 'menu-admin', component: MenuAdminComponent
},
{
  path: 'menu-docente', component: MenuDocenteComponent
},
{
  path: 'gestion-grados', component: GestionGradosComponent
},
{
  path: 'gestion-cursos', component: GestionCursosComponent
},
{
  path: 'gestion-asignaturas', component: GestionAsignaturasComponent
},
{
  path: 'gestion-alumnos', component: GestionAlumnosComponent
},
{
  path: 'gestion-docentes', component: GestionDocentesComponent
},
{
  path: 'gestion-administrador', component: GestionAdministradorComponent
},
{
  path: 'registro-nota', component: RegistroNotaComponent
},
{
  path: 'lista-notas-docente', component: ConsultaNotaDocenteComponent
},
{
  path: 'lista-notas-alumno', component: ConsultaNotaAlumnoComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
