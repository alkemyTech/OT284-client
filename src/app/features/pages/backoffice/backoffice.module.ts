import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BackofficeComponent,
    EditHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackofficeRoutingModule
  ]
})
export class BackofficeModule { }
