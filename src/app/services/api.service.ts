import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { IAcademicYear } from '../models/academic-year';
import { Db } from '../models/db';

// tslint:disable-next-line:max-line-length
// const dataUrl = 'https://gist.githubusercontent.com/stvvt/b323a3c0f534baf447c9171b1b80b5db/raw/8299d299b07a91da569138b97cbd3727c9c55c43/uni-week-data.json';
const dataUrl = 'https://bitbucket.org/!api/2.0/snippets/stv_vt/5AGeR/c411f0b5a9bd09a78aac4a912c1e23084aff32bc/files/uni-week-data.json';

export class MissingDataError extends Error {
    constructor() {
        super('Missing data');
    }
}

@Injectable()
export class ApiService {

    constructor(private http: Http) {}

    getYear(date) {
        return this.http.get(dataUrl)
            .map(response => <IAcademicYear[]>response.json())
            .map(data => new Db(data))
            .map(db => {
                const year = db.getYear(date);
                if (!year) {
                     throw new MissingDataError();
                }
                return year;
            });
    }
}
