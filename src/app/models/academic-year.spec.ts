import { AcademicYear } from './academic-year';
import { data as fixture } from './fixture';

describe('AcademicYear', () => {
    const year = new AcademicYear(fixture[0]);

    it('should create an instance', () => {
        expect(year).toBeTruthy();
    });

    describe('getTerm()', () => {
        it('should return the term', () => {
            expect(year.getTerm(new Date('2015-11-01'))).toEqual(jasmine.objectContaining({
                name: fixture[0].terms[0].name
            }));
        });
        it('should return undefined if not in any term', () => {
            expect(year.getTerm(new Date('2014-11-01'))).toBeUndefined();
        });
    });

    describe('getBreak()', () => {
        it('should return the break', () => {
            expect(year.getBreak(new Date('2016-01-01'))).toEqual(jasmine.objectContaining({
                name: fixture[0].breaks[0].name
            }));
        });
        it('should return undefined if not in a break', () => {
            expect(year.getBreak(new Date('2015-12-01'))).toBeUndefined();
        });
    });

    describe('getWeekNo()', () => {
        const y = new AcademicYear({
            terms: [{
                start: '2017-09-15',
                end: '2017-31-12'
            }]
        });
        it('should return undefined outside terms', () => {
            expect(y.getWeekNo(new Date('2017-09-14'))).toBeUndefined();
        });
    });
});
