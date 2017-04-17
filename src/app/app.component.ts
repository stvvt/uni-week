import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';

import { ApiService, MissingDataError } from './services/api.service';
import { AcademicYear } from './models/academic-year';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [ApiService]
})
export class AppComponent implements OnInit {
    public date: Date = new Date();
    public weekNo;
    public term;
    public loading = true;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.api.getYear(this.date)
            .finally(() => this.loading = false)
            .subscribe(year => {
                this.weekNo = year.getWeekNo(this.date);
                this.term = year.getTerm(this.date);
            }, err => {
                if (err instanceof MissingDataError) {
                } else {
                    console.error(err);
                }
            });
    }

    termStart() {

    }
}
