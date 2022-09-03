import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { ActivityFormComponent } from "./pages/activities/activity-form/activity-form.component";
import { LoginFormComponent } from "./pages/auth/login-form/login-form.component";
import { RegisterFormComponent } from "./pages/auth/register-form/register-form.component";
import { CategoriesFormComponent } from "./pages/categories/categories-form/categories-form.component";
import { SlidesFormComponent } from "./pages/slides/slides-form/slides-form.component";
import { UserFormComponent } from "./pages/users/user-form/user-form.component";
import { HttpClientModule } from "@angular/common/http";
import { NewsCardsComponent } from "./pages/news/news-cards/news-cards.component";
import { AboutViewComponent } from "./pages/about/about-view/about-view.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from "../shared/shared.module";
import { ContactFormComponent } from "./pages/contact/contact-form/contact-form.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MembersViewComponent } from './pages/members/members-view/members-view.component';
import { ContactViewComponent } from './pages/contact/contact-view/contact-view.component';

import { HomePageComponent } from "./pages/home/home-page/home-page.component";
import { CarruselComponent } from "./pages/home/carrusel/carrusel.component";
import { AboutUsComponent } from './pages/about/about-us/about-us.component';
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { NewsDetailsComponent } from './pages/news/news-details/news-details.component';
import { AboutTweetsComponent } from './pages/about/about-tweets/about-tweets.component';
import { NgxTwitterTimelineModule } from 'ngx-twitter-timeline';
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";


@NgModule({
  declarations: [
    ActivityFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CategoriesFormComponent,
    SlidesFormComponent,
    UserFormComponent,
    NewsCardsComponent,
    AboutViewComponent,
    ContactFormComponent,
    HomePageComponent,
    CarruselComponent,
    MembersViewComponent,
    ContactViewComponent,
    AboutUsComponent,
    NewsDetailsComponent,
    AboutTweetsComponent,
  ],
  exports: [
    ActivityFormComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CategoriesFormComponent,
    SlidesFormComponent,
    UserFormComponent,
    RouterModule,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,  MatInputModule, MatIconModule, SharedModule,
    NgxMatFileInputModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    NgxTwitterTimelineModule,
  ],
})
export class FeaturesModule {}
