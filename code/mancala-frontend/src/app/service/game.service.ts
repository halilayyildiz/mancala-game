import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

@Injectable()
export class GameService {

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

    joinGame(): Observable<any> {
        const url = `/api/game/join?gameType=mancala&playerName=Mancalar`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('error', [])),
                map(res => {
                    console.log(status);
                    return {
                        'gameId': res.gameId,
                        'playerId': res.playerId,
                        'playerIndex': res.playerIndex + 1,

                    };
                }),
        );
    }

    sendMove(playerId, gameId, pitNum): Observable<any> {
        const url = `/api/player/move?playerId=${playerId}&gameId=${gameId}&pitNum=${pitNum}`;
        return this.http.get<any>(url)
            .pipe(
                catchError(this.handleError('error', [])),
                map(res => {
                    return res.status;
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
