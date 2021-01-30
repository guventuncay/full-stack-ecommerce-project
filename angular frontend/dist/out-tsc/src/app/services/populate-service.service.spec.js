import { TestBed } from '@angular/core/testing';
import { PopulateServiceService } from './populate-service.service';
describe('PopulateServiceService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PopulateServiceService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=populate-service.service.spec.js.map