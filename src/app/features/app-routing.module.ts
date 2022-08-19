import { ActivityFormComponent } from "./pages/activities/activity-form/activity-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from "./pages/home/home-page/home-page.component";

const routes: Routes = [
  { 
    path: "", 
    component: HomePageComponent 
  },
  { 
    path: "actividades", 
    component: ActivityFormComponent 
  },
  {
    path: "backoffice",
    loadChildren:() => import('./pages/backoffice/backoffice.module').then(m => m.BackofficeModule)
  },
  {
    path: "**",
    redirectTo: "actividades",
    pathMatch: "full",
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
