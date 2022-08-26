import { FeaturesModule } from "./features/features.module";
import { CoreModule } from "./core/core.module";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { organizationReducer } from "./state/reducers/organization.reducer";
import { ROOT_REDUCERS } from "./state/app.state";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule, FeaturesModule, NoopAnimationsModule, StoreModule.forRoot(ROOT_REDUCERS), StoreDevtoolsModule.instrument({ name: 'TEST' })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
