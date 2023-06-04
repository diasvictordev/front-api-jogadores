import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaTipoComponent } from './lista-tipo/lista-tipo.component';
import { HomeTipoComponent } from './home-tipo/home-tipo.component';
import { RouterModule } from '@angular/router';
import { tipoRoutes } from './tipo-routing.module';
import { FormTipoComponent } from './form-tipo/form-tipo.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'

@NgModule({
  declarations: [
    ListaTipoComponent,
    HomeTipoComponent,
    FormTipoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(tipoRoutes),
    MatCardModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatTableModule
  ]
})
export class TipoModule { }
