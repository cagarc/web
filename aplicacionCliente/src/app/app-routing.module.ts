import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AutenticacionComponent } from './components/autenticacion/autenticacion.component';
import { PantallaInicioComponent } from './components/pantalla-inicio/pantalla-inicio.component';

const routes: Routes = [
  { path: '', component: AutenticacionComponent, pathMatch: 'full' },
  { path: 'pantallaInicio', component: PantallaInicioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
