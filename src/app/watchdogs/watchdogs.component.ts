import { Component, OnInit } from '@angular/core';
import { Watchdog } from '../watchdog';
import { WatchdogService } from '../watchdog.service';
@Component({
  selector: 'app-watchdogs',
  templateUrl: './watchdogs.component.html',
  styleUrls: ['./watchdogs.component.css']
})
export class WatchdogsComponent implements OnInit {
watchdogs: Watchdog[];
  constructor(private watchdogService: WatchdogService) { }

  ngOnInit() {
	  this.getWatchdogs();
  }

getWatchdogs(): void {
	this.watchdogService.getWatchdogs()
		.subscribe(watchdogs => this.watchdogs = watchdogs);
}
add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.watchdogService.addWatchdog({ name } as Watchdog)
    .subscribe(watchdog => {
      this.watchdogs.push(watchdog);
    });
}
delete(watchdog: Watchdog): void {
  this.watchdogs = this.watchdogs.filter(h => h !== watchdog);
  this.watchdogService.deleteWatchdog(watchdog).subscribe();
}
}
