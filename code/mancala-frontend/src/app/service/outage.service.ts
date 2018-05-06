import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable()
export class OutageService {

    constructor(private messageService: MessageService, private http: HttpClient) { }

    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        this.messageService.add('OutageService: ' + message);
    }

    handleSwitchStatusChange(switchId, newStatus): Observable<Element[]> {
        const url = '/api/gis/load/all';
        return this.http.get<any>(url)
            .pipe(
            tap(_ => this.log(`switch status changed, id = ${switchId}, new status = ${newStatus}`)),
            catchError(this.handleError('onSwitchStatusChange', [])),
            map(res => res.result.loads),
            map(loads => {
                const loadIds = [];
                loads.forEach(load => loadIds.push(load.id));
                return loadIds;
            }),
        );
    }

    getOutageStatuses(): Observable<any> {
        const url = '/api/outage/status/all';
        return this.http.get<any>(url)
            .pipe(
            tap(_ => this.log(`fetched all outage statuses`)),
            catchError(this.handleError('getAllOutageStatuses', [])),
            map(res => res.result.outageStatuses),
            map(statuses => {
                statuses.forEach(status => status.enabled = true);
                return statuses;
            }),
        );
    }

    getOutageTypes(): Observable<any> {
        const url = '/api/outage/type/all';
        return this.http.get<any>(url)
            .pipe(
            tap(_ => this.log(`fetched all outage types`)),
            catchError(this.handleError('getAllOutageTypes', [])),
            map(res => res.result.outageTypes),
            map(types => {
                types.forEach(type => type.enabled = true);
                return types;
            }),
        );
    }

    getOutageVoltageLevels(): Observable<any> {
        const url = '/api/outage/voltagelevel/all';
        return this.http.get<any>(url)
            .pipe(
            tap(_ => this.log(`fetched all outage voltage levels`)),
            catchError(this.handleError('getAllOutageVoltageLevels', [])),
            map(res => res.result.outageVoltageLevels),
            map(levels => {
                levels.forEach(level => level.enabled = true);
                return levels;
            }),
        );
    }
}
