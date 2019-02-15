import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchdogsComponent } from './watchdogs/watchdogs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WatchdogDetailComponent } from './watchdog-detail/watchdog-detail.component';
const routes: Routes = [
	{ path: 'detail/:id', component: WatchdogDetailComponent },
	{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: 'watchdogs', component: WatchdogsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
