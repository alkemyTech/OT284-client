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
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from "@angular/fire/auth-guard";
import { AuthGuardGuard } from "./pages/auth/guards/auth-guard.guard";
import { SlidesComponent } from "./pages/activities/slides/slides.component";
import { ActivityViewComponent } from "./pages/activities/activity-view/activity-view.component";


const routes: Routes = [
  {
    path: "nosotros",
    component: AboutViewComponent,
  },
  {
    path: "",
    component: HomePageComponent,
    ...canActivate( () => redirectUnauthorizedTo(['/login']))
  },
  {
    path: "actividades",
    component: ActivityViewComponent,
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
    canActivate: [AuthGuardGuard]
  },
  {
    path:"novedades/:id",
    component:NewsDetailsComponent
  },
  {
    path: "register",
    component: RegisterFormComponent,
    ...canActivate( () => redirectLoggedInTo(['']))
  },
  {
    path: "login",
    component: LoginFormComponent,
    ...canActivate( () => redirectLoggedInTo(['']))
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
