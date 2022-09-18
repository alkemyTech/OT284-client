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
import { EditComponent } from "./organization/edit/edit.component";
import { CreateEditActivityComponent } from "./activities/create-edit-activity/create-edit-activity.component";
import { CategoriesTableComponent } from "./categories-table/categories-table.component";
import { CategoriesFormComponent } from "../categories/categories-form/categories-form.component";
import { SlidesViewComponent } from "./slides/slides-view/slides-view.component";
import { SlidesFormComponent } from "./slides/slides-form/slides-form.component";

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
    path: "members/edit/:id",
    component: MemberFormComponent,
  },
  {
    path: "members/create",
    component: MemberFormComponent
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
    path: "organization/edit",
    component: EditComponent,
  },
  {
    path: "activity/create",
    component: CreateEditActivityComponent,
  },
  {
    path: "activity/edit",
    component: CreateEditActivityComponent,
  },
  {
    path: "categories",
    component: CategoriesTableComponent,
  },
  {
    path: "categorias/create",
    component: CategoriesFormComponent,
  },
  {
    path: "categorias/edit/:id",
    component: CategoriesFormComponent,
  },
  {
    path: "slides",
    component: SlidesViewComponent,
  },
  {
    path: "slides/create",
    component: SlidesFormComponent,
  },
  {
    path: "slides/edit",
    component: SlidesFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BackofficeRoutingModule {}
