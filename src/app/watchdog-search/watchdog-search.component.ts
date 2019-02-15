import { Component, OnInit } from '@angular/core';
 
import { Observable, Subject } from 'rxjs';
 
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
 
import { Watchdog } from '../watchdog';
import { WatchdogService } from '../watchdog.service';
 
@Component({
  selector: 'app-watchdog-search',
  templateUrl: './watchdog-search.component.html',
  styleUrls: [ './watchdog-search.component.css' ]
})
export class WatchdogSearchComponent implements OnInit {
  watchdogs$: Observable<Watchdog[]>;
  private searchTerms = new Subject<string>();
 
  constructor(private watchdogService: WatchdogService) {}
 
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
 
  ngOnInit(): void {
    this.watchdogs$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),
 
      // ignore new term if same as previous term
      distinctUntilChanged(),
 
      // switch to new search observable each time the term changes
      switchMap((term: string) => this.watchdogService.searchWatchdogs(term)),
    );
  }
}