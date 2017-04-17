import { TimePeriod } from './time-period';
import { data as fixture } from './fixture';

describe('TimePeriod', () => {
    const period = new TimePeriod({
        start: '2015-12-25',
        end: '2016-02-29',
        name: 'Test Perod'
    });

    it('should create an instance', () => {
        expect(period).toBeTruthy();
    });

    describe('contains()', () => {
        it('should be true for dates within the period', () => {
            expect(period.contains(new Date('2015-12-25'))).toBe(true);
            expect(period.contains(new Date('2016-02-29'))).toBe(true);
            expect(period.contains(new Date('2016-01-01'))).toBe(true);
        });

        it('should be false for dates outside the period', () => {
            expect(period.contains(new Date('2015-12-24'))).toBe(false);
            expect(period.contains(new Date('2016-02-30'))).toBe(false);
        });
    });
});
