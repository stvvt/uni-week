import { IAcademicYear, AcademicYear } from './academic-year';

export class Db {
    private data: AcademicYear[];

    constructor(data: IAcademicYear[]) {
        this.data = data.map(year => new AcademicYear(year));
    }

    getYear(date: Date): AcademicYear {
        return this.data.find(year => year.contains(date));
    }
}
