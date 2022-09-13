import { MemberFormComponent } from "./members/member-form/member-form.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackofficeRoutingModule } from "./backoffice-routing.module";
import { BackofficeComponent } from "./backoffice.component";
import { NewsFormComponent } from "../news/news-form/news-form.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { FormCreateUserComponent } from "./users/form-create-user/form-create-user.component";
import { UsersComponent } from "./users/users.component";
import { EditHomeComponent } from "./edit-home/edit-home.component";
import { MatTableModule } from "@angular/material/table";
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { FormMapComponent } from "./users/form-create-user/form-map/form-map.component";
import { NewsListComponent } from "../news/news-list/news-list.component";
import { MembersComponent } from "./members/members.component";
import { CreateMemberComponent } from "./members/create-member/create-member.component";
import { TestimonialFormComponent } from "./testimonials/testimonial-form/testimonial-form.component";
import { TestimonialsPageComponent } from "./testimonials/testimonials-page/testimonials-page.component";
import { TermsAndConditionsComponent } from "./users/form-create-user/terms-and-conditions/terms-and-conditions.component";
import { OrganizationComponent } from "./organization/organization.component";
import { EditComponent } from "./organization/edit/edit.component";
import { CreateEditActivityComponent } from './activities/create-edit-activity/create-edit-activity.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    NewsFormComponent,
    EditHomeComponent,
    TestimonialFormComponent,
    FormCreateUserComponent,
    UsersComponent,
    FormMapComponent,
    NewsListComponent,
    MemberFormComponent,
    MembersComponent,
    CreateMemberComponent,
    TermsAndConditionsComponent,
    OrganizationComponent,
    TestimonialsPageComponent,
    EditComponent,
    CreateEditActivityComponent,
    CategoriesTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NgxMatFileInputModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    CKEditorModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
  ],
})
export class BackofficeModule {}
