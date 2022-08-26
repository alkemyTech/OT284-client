import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackofficeRoutingModule } from './backoffice-routing.module';
import { BackofficeComponent } from './backoffice.component';
import { NewsFormComponent } from '../news/news-form/news-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    BackofficeComponent,
    NewsFormComponent,
  ],
  exports:[
    NewsFormComponent,
  ],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    CKEditorModule,
    ReactiveFormsModule
  ]
})

export class BackofficeModule { }
