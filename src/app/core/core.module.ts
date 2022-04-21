import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    NavBarComponent,
    HomeComponent,
    LoginComponent,
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([
    ])
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
