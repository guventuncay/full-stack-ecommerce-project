import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
describe('CartService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CartService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=cart.service.spec.js.map