import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTipoComponent } from './home-tipo/home-tipo.component';
import { ListaTipoComponent } from './lista-tipo/lista-tipo.component';
import { FormTipoComponent } from './form-tipo/form-tipo.component';

export const tipoRoutes: Routes = [
  {
    path: "tipo",
    component: HomeTipoComponent,
    children: [
      {
        path: "",
        component: ListaTipoComponent
      },
      {
        path: "novo",
        component: FormTipoComponent

      },
      {
        path: ":codigo",
        component: FormTipoComponent

      }
    ]
  }
];

