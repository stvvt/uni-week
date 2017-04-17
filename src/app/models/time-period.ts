export interface ITimePeriod {
    start?: string | Date;
    end?: string | Date;
    name?: string;
}

function addDays(date: Date, days: number) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

export class TimePeriod {
    public start: Date;
    public end: Date;
    public name: string;

    constructor(data: ITimePeriod) {
        this.name = data.name;
        if (data.start) {
            this.start = data.start instanceof Date ? data.start : new Date(data.start);
        }
        if (data.end) {
            this.end = data.end instanceof Date ? data.end : new Date(data.end);
        }
    }

    check(): boolean {
        // @TODO
        return null;
    }

    contains(date: Date): boolean {
        return date >= this.start && date <= this.end;
    }

    expandBy(days: number): TimePeriod {
        return new TimePeriod({
            start: addDays(this.start, -1),
            end: addDays(this.end, 1)
        });
    }

    subtract(period: TimePeriod): TimePeriod[] {
        if (this.start > period.end || this.end < period.start) {
            // period and this do not overlap
            return [this];
        }

        period = period.expandBy(1);

        const result: TimePeriod[] = [];

        if (this.contains(period.start)) {
            result.push(new TimePeriod({
                start: this.start,
                end: period.start
            }));
        }
        if (this.contains(period.end)) {
            result.push(new TimePeriod({
                start: period.end,
                end: this.end
            }));
        }

        return result;
    }

    subtractAll(periods: TimePeriod[]): TimePeriod[] {
        let result: TimePeriod[] = [this];

        periods.some(period => {
            result = result.reduce<TimePeriod[]>((acc, p) => {
                return acc.concat(p.subtract(period));
            }, []);

            return result.length === 0;
        });

        return result;
    }
}
