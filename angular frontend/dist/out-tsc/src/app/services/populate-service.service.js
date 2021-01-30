import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
let PopulateServiceService = class PopulateServiceService {
    constructor() { }
    getCreditCardMonths(startMonth) {
        let data = [];
        // uild an array for "Month" dropdown list
        // - start at current month and loop until
        for (let month = startMonth; month <= 12; month++) {
            data.push(month);
        }
        return of(data);
    }
    getCreditCardYears() {
        let data = [];
        // uild an array for "Year" dropdown list
        // - start at current year and loop for next 10 years
        const START_YEAR = new Date().getFullYear();
        const END_YEAR = START_YEAR + 10;
        for (let year = START_YEAR; year <= END_YEAR; year++) {
            data.push(year);
        }
        return of(data);
    }
};
PopulateServiceService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PopulateServiceService);
export { PopulateServiceService };
//# sourceMappingURL=populate-service.service.js.map