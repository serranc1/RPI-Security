import { Component, OnInit } from '@angular/core';
import { Watchdog } from '../watchdog';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { WatchdogService }  from '../watchdog.service';
@Component({
  selector: 'app-watchdog-detail',
  templateUrl: './watchdog-detail.component.html',
  styleUrls: ['./watchdog-detail.component.css']
})

export class WatchdogDetailComponent implements OnInit {
watchdog: Watchdog;
  constructor(
  private route: ActivatedRoute,
  private watchdogService: WatchdogService,
  private location: Location
) {}

  ngOnInit(): void {
	this.getWatchdog();
  }

getWatchdog(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.watchdogService.getWatchdog(id)
    .subscribe(watchdog => this.watchdog = watchdog);
}

save(): void {
   this.watchdogService.updateWatchdog(this.watchdog)
     .subscribe(() => this.goBack());
 }

goBack(): void {
  this.location.back();
}
}
