import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { EditHomeComponent } from './edit-home/edit-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { NgxMatFileInputModule } from '@angular-material-components/file-input';





@NgModule({
  declarations: [
    BackofficeComponent,
    EditHomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
    MatButtonModule,
    NgxMatFileInputModule,
    MatInputModule
  ]
})
export class BackofficeModule { }
