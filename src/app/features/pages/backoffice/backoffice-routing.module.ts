import { BackofficeComponent } from './backoffice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditHomeComponent } from './edit-home/edit-home.component';

const routes: Routes = [
  { 
    path: "", 
    component: BackofficeComponent
  },
  { 
    path: "home", 
    component: EditHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
