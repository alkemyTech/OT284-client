import { FeaturesModule } from "./features/features.module";
import { CoreModule } from "./core/core.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { ROOT_REDUCERS } from "./state/app.state";
import { EffectsModule } from "@ngrx/effects";
import { OrganizationEffects } from "./state/effects/organization.effects";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { environment } from "../environments/environment";
import { provideAuth, getAuth } from "@angular/fire/auth";
import { UsersEffects } from "./state/effects/users.effects";
import { MembersEffects } from "./state/effects/members.effects";
import { SharedModule } from "./shared/shared.module";
import { NewsEffects } from "./state/effects/news.effects";
import { CategoriesEffects } from './state/effects/categories.effects';
import { ActivitiesEffects } from "./state/effects/activities.effects";
import { SlidesEffects } from "./state/effects/slides.effects";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    FeaturesModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: "TEST" }),
    EffectsModule.forRoot([OrganizationEffects, UsersEffects, MembersEffects, ActivitiesEffects, CategoriesEffects, NewsEffects, SlidesEffects]),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  LeafletModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
