import { BackofficeComponent } from "./backoffice.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewsFormComponent } from "../news/news-form/news-form.component";
import { UsersComponent } from "./users/users.component";
import { FormCreateUserComponent } from "./users/form-create-user/form-create-user.component";
import { EditHomeComponent } from "./edit-home/edit-home.component";
import { NewsListComponent } from "../news/news-list/news-list.component";
import { MemberFormComponent } from "./members/member-form/member-form.component";
import { TestimonialsPageComponent } from "./testimonials/testimonials-page/testimonials-page.component";
import { MembersComponent } from "./members/members.component";
import { CreateMemberComponent } from "./members/create-member/create-member.component";
import { OrganizationComponent } from "./organization/organization.component";
import { CreateEditActivityComponent } from "./activities/create-edit-activity/create-edit-activity.component";

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
    path: "news",
    component: NewsListComponent,
  },
  {
    path: "news/create",
    component: NewsFormComponent,
  },
  {
    path: "members/edit",
    component: MemberFormComponent,
  },
  {
    path: "news/:id",
    component: NewsFormComponent,
  },
  {
    path: "members",
    component: MembersComponent,
  },
  {
    path: "testimonials/create",
    component: TestimonialsPageComponent,
  },
  {
    path: "testimonials/:id",
    component: TestimonialsPageComponent,
  },
  {
    path: "organization",
    component: OrganizationComponent,
  },
  {
    path: "activity/create",
    component: CreateEditActivityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
