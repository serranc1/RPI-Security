import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { WatchdogsComponent } from './watchdogs/watchdogs.component';
import { WatchdogDetailComponent } from './watchdog-detail/watchdog-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { WatchdogSearchComponent } from './watchdog-search/watchdog-search.component';
@NgModule({
  declarations: [
    AppComponent,
    WatchdogsComponent,
    WatchdogDetailComponent,
    MessagesComponent,
    DashboardComponent,
    WatchdogSearchComponent
  ],
  imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
  HttpClientModule,
  HttpClientInMemoryWebApiModule.forRoot(
	InMemoryDataService, { dataEncapsulation:false }
  )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
