import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Watchdog } from './watchdog';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const watchdogs = [
      { id: 1, name: 'Bloodhound', guarding: 'Front Door' },
	  { id: 2, name: 'Cu', guarding: 'Garage Door'  },
	  { id: 3, name: 'Lancelot', guarding: 'Back Door' },
	  { id: 4, name: 'Hot Dog', guarding: 'Side Door' },
	  { id: 5, name: 'Jake', guarding: 'Treehouse' },
	  { id: 6, name: 'Ruth', guarding: 'Cemetery' },
	  { id: 7, name: 'Alexander', guarding: 'Basement' },
	  { id: 8, name: 'Big Puppy', guarding: 'Master Bedroom' },
	  { id: 9, name: 'Fido', guarding: 'Kitchen' },
	  { id: 10, name: 'Brian', guarding: 'Living Room' }
    ];
    return {watchdogs};
  }

  // Overrides the genId method to ensure that a watchdog always has an id.
  // If the watchdogs array is empty,
  // the method below returns the initial number (1).
  // if the watchdogs array is not empty, the method below returns the highest
  // watchdog id + 1.
  genId(watchdogs: Watchdog[]): number {
    return watchdogs.length > 0 ? Math.max(...watchdogs.map(watchdog => watchdog.id)) + 1 : 1;
  }
}