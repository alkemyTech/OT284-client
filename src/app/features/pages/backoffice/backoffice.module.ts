import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackofficeRoutingModule } from "./backoffice-routing.module";
import { BackofficeComponent } from "./backoffice.component";

import { SharedModule } from "src/app/shared/shared.module";
import { FormCreateUserComponent } from "./users/form-create-user/form-create-user.component";
import { UsersComponent } from "./users/users.component";
import { EditHomeComponent } from "./edit-home/edit-home.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import {MatTableModule} from '@angular/material/table';
import { NgxMatFileInputModule } from "@angular-material-components/file-input";
import { FormMapComponent } from "./users/form-create-user/form-map/form-map.component";
import { MembersComponent } from './members/members.component';
import { CreateMemberComponent } from './members/create-member/create-member.component';

@NgModule({
  declarations: [
    BackofficeComponent,
    EditHomeComponent,
    FormCreateUserComponent,
    UsersComponent,
    FormMapComponent,
    MembersComponent,
    CreateMemberComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BackofficeRoutingModule,
    MatButtonModule,
    NgxMatFileInputModule,
    MatInputModule,
    SharedModule,
    MatTableModule
  ],
})
export class BackofficeModule {}
