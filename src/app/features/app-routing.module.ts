import { ActivityFormComponent } from "./pages/activities/activity-form/activity-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "actividades",
    component: ActivityFormComponent,
  },
  {
    path: "backoffice",
    loadChildren: () =>
      import("./pages/backoffice/backoffice.module").then(
        (m) => m.BackofficeModule
      ),
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
