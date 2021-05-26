import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PantallaInicioComponent} from './pantalla-inicio.component'

const routes: Routes = [{ path: '', component: PantallaInicioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PantallaInicioRoutingModule { }
