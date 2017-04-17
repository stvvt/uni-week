import { TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';

import { ApiService } from './api.service';

describe('ApiService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ApiService],
            imports: [HttpModule]
        });
    });

    it('should ...', inject([ApiService], (service: ApiService) => {
        expect(service).toBeTruthy();
    }));
});
