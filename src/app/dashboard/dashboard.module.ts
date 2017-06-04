import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomeComponent} from './home/home.component';
import {SettingsComponent} from './settings/settings.component';
import {AdminComponent} from './admin/admin.component';
import {RouterModule} from "@angular/router";
import {dashboardRoutes} from "./dashboard.routes";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [DashboardComponent, HomeComponent, SettingsComponent, AdminComponent],
  exports: [DashboardComponent]
})
export class DashboardModule {
}
