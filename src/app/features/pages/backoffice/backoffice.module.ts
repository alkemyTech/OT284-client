import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackofficeRoutingModule } from "./backoffice-routing.module";
import { BackofficeComponent } from "./backoffice.component";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "src/app/shared/shared.module";
import { FormCreateUserComponent } from "./users/form-create-user/form-create-user.component";
import { UsersComponent } from "./users/users.component";

@NgModule({
  declarations: [BackofficeComponent, FormCreateUserComponent, UsersComponent],
  imports: [
    CommonModule,
    BackofficeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
})
export class BackofficeModule {}
