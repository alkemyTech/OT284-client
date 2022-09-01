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
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { FormMapComponent } from "./users/form-create-user/form-map/form-map.component";
import { TermsAndConditionsComponent } from "./users/form-create-user/terms-and-conditions/terms-and-conditions.component";

@NgModule({
  declarations: [
    BackofficeComponent,
    NewsFormComponent,
    EditHomeComponent,
    FormCreateUserComponent,
    UsersComponent,
    FormMapComponent,
    TermsAndConditionsComponent,
    MemberFormComponent,
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
    FormsModule,
  ],
})
export class BackofficeModule {}
