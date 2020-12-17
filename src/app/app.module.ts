import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const firebaseConfig = {
  apiKey: "AIzaSyAWkkL4gLhOjrcSVbLfhEMlN1R_NmUirw8",
  authDomain: "agenda-escolar-20dec.firebaseapp.com",
  databaseURL: "https://agenda-escolar-20dec.firebaseio.com",
  projectId: "agenda-escolar-20dec",
  storageBucket: "agenda-escolar-20dec.appspot.com",
  messagingSenderId: "291275685273",
  appId: "1:291275685273:web:7eda530e640218322aa708",
  measurementId: "G-GYYWS46NKE"
};

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
import { AngularFirePerformanceModule, PerformanceMonitoringService } from '@angular/fire/performance';
import { ToastrModule } from 'ngx-toastr';
import { Mugan86GoogleAnalyticsModule } from 'mugan86-ng-google-analytics';

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
    AngularFirePerformanceModule,
    AngularFireAuthModule,
    Mugan86GoogleAnalyticsModule.forRoot(
      {
        analyticsId: 'UA-158164314-1',
        showLog: true
      }
    )
  ],
  providers: [PerformanceMonitoringService],
  bootstrap: [AppComponent]
})
export class AppModule { }
