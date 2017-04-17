import { TimePeriod, ITimePeriod } from './time-period';

export interface IAcademicYear extends ITimePeriod {
    terms: ITimePeriod[];
    breaks?: ITimePeriod[];
}

class Week extends TimePeriod {
    /**
     * The date of next Sunday. If `date` is Sunday, return the same date unchanged.
     *
     * @param date
     * @return What date is the Sunday after `date`
     */
    static sundayAfter(date: Date): Date {
        const monthDay = date.getDate();
        const nextSun = monthDay + (7 - date.getDay()) % 7;
        return new Date(date.getFullYear(), date.getMonth(), nextSun);
    }

    constructor(date: Date) {
        super({
            start: date,
            end: Week.sundayAfter(date)
        });
    }

    getNextWeek(): Week {
        return new Week(new Date(this.end.getFullYear(), this.end.getMonth(), this.end.getDate() + 1));
    }
}

export class AcademicYear extends TimePeriod {
    public terms: TimePeriod[];
    public breaks: TimePeriod[];

    constructor(data: IAcademicYear) {
        super(data);
        this.terms = data.terms.map(term => new TimePeriod(term));
        this.breaks = (data.breaks || []).map(brk => new TimePeriod(brk));
    }

    get start() {
        return this.terms[0].start;
    }

    get end() {
        return this.terms[this.terms.length - 1].end;
    }

    getTerm(date: Date): TimePeriod {
        return this.terms.find(term => term.contains(date));
    }

    getBreak(date: Date): TimePeriod {
        return this.breaks.find(brk => brk.contains(date));
    }

    /**
     * What is the ordinal number of the week containing date?
     *
     * @param date
     * @returns number The ordinal number of week relative to the beginning of the term, containing date; undefined when
     *                  date is not in any term.
     */
    getWeekNo(date: Date): number {
        const term = this.getTerm(date);

        if (!term) {
            return;
        }

        let week = new Week(term.start);
        let weekNo = 0;

        while (week.start <= date) {
            if (week.subtractAll(this.breaks).length > 0) {
                weekNo++;
            }
            week = week.getNextWeek();
        }

        return weekNo;
    }
}

