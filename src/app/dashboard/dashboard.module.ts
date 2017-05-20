import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DashboardComponent, HomeComponent, SettingsComponent, AdminComponent]
})
export class DashboardModule { }
