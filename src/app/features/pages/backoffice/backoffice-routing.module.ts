import { BackofficeComponent } from "./backoffice.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UsersComponent } from "./users/users.component";
import { FormCreateUserComponent } from "./users/form-create-user/form-create-user.component";
import { EditHomeComponent } from "./edit-home/edit-home.component";
import { MembersComponent } from "./members/members.component";

const routes: Routes = [
  {
    path: "",
    component: BackofficeComponent,
  },
  {
    path: "users",
    component: UsersComponent,
  },
  {
    path: "users/create",
    component: FormCreateUserComponent,
  },
  {
    path: "users/edit",
    component: FormCreateUserComponent,
  },
  {
    path: "home",
    component: EditHomeComponent,
  },
  {
    path: "members",
    component: MembersComponent
  },
  {
    path: "members/create",

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
