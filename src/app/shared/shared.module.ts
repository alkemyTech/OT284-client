import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from './components/title/title.component';
import { PhonePipe } from './helpers/phonePipe';



@NgModule({
  declarations: [
    TitleComponent,
    PhonePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TitleComponent,
    PhonePipe
  ]
})
export class SharedModule { }
