import { Injectable } from '@angular/core';
import { Watchdog } from './watchdog';
import { WATCHDOGS } from './mock-watchdogs';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
const httpOptions = {
	headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class WatchdogService {

  constructor(
  private http: HttpClient,
  private messageService: MessageService) { }
  /** Log a WatchdogService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`WatchdogService: ${message}`);
  }
  private watchdogsUrl = 'api/watchdogs';  // URL to web api
  
  /** GET watchdogs from the server */
  getWatchdogs (): Observable<Watchdog[]> {
	return this.http.get<Watchdog[]>(this.watchdogsUrl)
		.pipe(
			tap(_ => this.log('fetched watchdogs')),
			catchError(this.handleError('getWatchdogs', []))
		);

  }
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
/** GET hero by id. Return `undefined` when id not found */
  getWatchdogNo404<Data>(id: number): Observable<Watchdog> {
    const url = `${this.watchdogsUrl}/?id=${id}`;
    return this.http.get<Watchdog[]>(url)
      .pipe(
        map(watchdogs => watchdogs[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} watchdog id=${id}`);
        }),
        catchError(this.handleError<Watchdog>(`getWatchdog id=${id}`))
      );
  }
	/** GET watchdog by id. will 404 if id not found */
  getWatchdog(id: number): Observable<Watchdog> {
	  const url = `${this.watchdogsUrl}/${id}`;
	  return this.http.get<Watchdog>(url).pipe(
		tap(_ => this.log(`fetched watchdog id=${id}`)),
		catchError(this.handleError<Watchdog>(`getWatchdog id=${id}`))
	  );
  }
  /** PUT: update the watchdog on the server */
updateWatchdog (watchdog: Watchdog): Observable<any> {
  return this.http.put(this.watchdogsUrl, watchdog, httpOptions).pipe(
    tap(_ => this.log(`updated watchdog id=${watchdog.id}`)),
    catchError(this.handleError<any>('updateWatchdog'))
  );
}
/** POST: add a new watchdog to the server */
addWatchdog (watchdog: Watchdog): Observable<Watchdog> {
  return this.http.post<Watchdog>(this.watchdogsUrl, watchdog, httpOptions).pipe(
    tap((newWatchdog: Watchdog) => this.log(`added watchdog w/ id=${newWatchdog.id}`)),
    catchError(this.handleError<Watchdog>('addWatchdog'))
  );
}
/** DELETE: delete the watchdog from the server */
deleteWatchdog (watchdog: Watchdog | number): Observable<Watchdog> {
  const id = typeof watchdog === 'number' ? watchdog : watchdog.id;
  const url = `${this.watchdogsUrl}/${id}`;

  return this.http.delete<Watchdog>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted watchdog id=${id}`)),
    catchError(this.handleError<Watchdog>('deleteWatchdog'))
  );
}
/* GET watchdogs whose name contains search term */
searchWatchdogs(term: string): Observable<Watchdog[]> {
  if (!term.trim()) {
    // if not search term, return empty watchdog array.
    return of([]);
  }
  return this.http.get<Watchdog[]>(`${this.watchdogsUrl}/?name=${term}`).pipe(
    tap(_ => this.log(`found watchdogs matching "${term}"`)),
    catchError(this.handleError<Watchdog[]>('searchWatchdogs', []))
  );
}
}
