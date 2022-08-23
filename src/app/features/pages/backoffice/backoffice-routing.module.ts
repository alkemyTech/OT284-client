import { BackofficeComponent } from './backoffice.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewsFormComponent } from '../news/news-form/news-form.component';
//import { GuardGuard } from './services/guard.guard'; FALTA CREARLO

const routes: Routes = [
  { 
    path: "", 
    component: BackofficeComponent
  },
  {
    path:"news/:id",
    component: NewsFormComponent,
    //canActivate:[GuardGuard]
  },
  {
    path:"news",
    component: NewsFormComponent,
    //canActivate:[GuardGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackofficeRoutingModule { }
