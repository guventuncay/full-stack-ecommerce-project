import { __awaiter } from "tslib";
import { TestBed } from '@angular/core/testing';
import { ProductCategoryMenuComponent } from './product-category-menu.component';
describe('ProductCategoryMenuComponent', () => {
    let component;
    let fixture;
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield TestBed.configureTestingModule({
            declarations: [ProductCategoryMenuComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(ProductCategoryMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=product-category-menu.component.spec.js.map