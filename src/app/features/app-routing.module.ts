import { ActivityFormComponent } from "./pages/activities/activity-form/activity-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { NewsCardsComponent } from "./pages/news/news-cards/news-cards.component";
import { AboutViewComponent } from "./pages/about/about-view/about-view.component";
import { HomePageComponent } from "./pages/home/home-page/home-page.component";
import { RegisterFormComponent } from "./pages/auth/register-form/register-form.component";
import { LoginFormComponent } from "./pages/auth/login-form/login-form.component";
import { ContactViewComponent } from "./pages/contact/contact-view/contact-view.component";
import { NewsDetailsComponent } from "./pages/news/news-details/news-details.component";

const routes: Routes = [
  {
    path: "nosotros",
    component: AboutViewComponent,
  },
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "actividades",
    component: ActivityFormComponent,
  },
  { 
    path: "contacto", 
    component: ContactViewComponent 
  },
  {
    path: "backoffice",
    loadChildren: () =>
      import("./pages/backoffice/backoffice.module").then(
        (m) => m.BackofficeModule
      ),
  },
  {
    path: "novedades",
    component: NewsCardsComponent,
  },
  {
    path:"novedades/:id",
    component:NewsDetailsComponent
  },
  {
    path: "register",
    component: RegisterFormComponent
  },
  {
    path: "login",
    component: LoginFormComponent
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
