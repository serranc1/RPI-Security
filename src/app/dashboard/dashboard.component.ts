import { Component, OnInit } from '@angular/core';
import { Watchdog } from '../watchdog';
import { WatchdogService } from '../watchdog.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  watchdogs: Watchdog[] = [];
 
  constructor(private watchdogService: WatchdogService) { }
 
  ngOnInit() {
    this.getWatchdogs();
  }
 
  getWatchdogs(): void {
    this.watchdogService.getWatchdogs()
      .subscribe(watchdogs => this.watchdogs = watchdogs.slice(0, 4));
  }
}
