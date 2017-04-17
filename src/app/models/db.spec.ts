import { Db } from './db';
import { data as fixture } from './fixture';

describe('Db', () => {
    const db = new Db(fixture);

    it('should create an instance', () => {
        expect(db).toBeTruthy();
    });

    describe('getYear()', () => {
        it('getYear should locate academic year', () => {
            expect(db.getYear(new Date('2016-04-14'))).toEqual(jasmine.objectContaining({
                name: fixture[0].name
            }));
            expect(db.getYear(new Date('2017-04-14'))).toEqual(jasmine.objectContaining({
                name: fixture[1].name
            }));
        });

        it('should return undefined for unknown years', () => {
            expect(db.getYear(new Date('2014-04-14'))).toBeUndefined();
            expect(db.getYear(new Date('2018-04-14'))).toBeUndefined();
        });
    });
});
