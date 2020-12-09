import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { firebaseConfig } from "../environments/environment";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { LoginComponent } from './componentes/login/login.component';
import { MenuAdminComponent } from './componentes/menu-admin/menu-admin.component';
import { MenuDocenteComponent } from './componentes/menu-docente/menu-docente.component';
import { FormsModule } from '@angular/forms';
import { GestionAdministradorComponent } from './componentes/gestion-administrador/gestion-administrador.component';
import { GestionAlumnosComponent } from './componentes/gestion-alumnos/gestion-alumnos.component';
import { GestionAsignaturasComponent } from './componentes/gestion-asignaturas/gestion-asignaturas.component';
import { GestionCursosComponent } from './componentes/gestion-cursos/gestion-cursos.component';
import { GestionDocentesComponent } from './componentes/gestion-docentes/gestion-docentes.component';
import { GestionGradosComponent } from './componentes/gestion-grados/gestion-grados.component';
import { RegistroNotaComponent } from './componentes/registro-nota/registro-nota.component';
import { ConsultaNotaDocenteComponent } from './componentes/consulta-nota-docente/consulta-nota-docente.component';
import { ConsultaNotaAlumnoComponent } from './componentes/consulta-nota-alumno/consulta-nota-alumno.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroUsuarioDocenteComponent } from './componentes/registro-usuario-docente/registro-usuario-docente.component';
import { RegistroEleccionUsuarioComponent } from './componentes/registro-eleccion-usuario/registro-eleccion-usuario.component';
import { RegistroUsuarioAlumnoComponent } from './componentes/registro-usuario-alumno/registro-usuario-alumno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MenuAdminComponent,
    MenuDocenteComponent,
    GestionAdministradorComponent,
    GestionAlumnosComponent,
    GestionAsignaturasComponent,
    GestionCursosComponent,
    GestionDocentesComponent,
    GestionGradosComponent,
    RegistroNotaComponent,
    ConsultaNotaDocenteComponent,
    ConsultaNotaAlumnoComponent,
    RegistroUsuarioDocenteComponent,
    RegistroEleccionUsuarioComponent,
    RegistroUsuarioAlumnoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
