import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginaInicialComponent } from './pagina-inicial.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PaginaInicialComponent],
  imports: [
    CommonModule,
    MatButtonModule
  ]
})
export class PaginaInicialModule { }
