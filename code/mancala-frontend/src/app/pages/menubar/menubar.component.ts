import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { catchError, map, tap, flatMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { MenuItem } from 'primeng/api';


@Component({
    selector: 'noms-menubar',
    templateUrl: './menubar.component.html',
    styleUrls: ['./menubar.scss']
})

export class MenubarComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute) { }

    menuItems: MenuItem[];

    prepareMenubarData() {
        this.menuItems = [
            {
                label: 'Mancala Game',
                routerLink: ['/mapview']
            },
        ];

    }

    ngOnInit() {
        this.prepareMenubarData();
    }
}
