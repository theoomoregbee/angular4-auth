import {Routes} from "@angular/router";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {HomeComponent} from "./home/home.component";
import {SettingsComponent} from "./settings/settings.component";
import {AdminComponent} from "./admin/admin.component";
/**
 * Created by theophy on 04/06/2017.
 */
export const dashboardRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'admin', component: AdminComponent},
  ]
  }
];
