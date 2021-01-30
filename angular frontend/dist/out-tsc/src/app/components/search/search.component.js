import { __decorate } from "tslib";
import { Component } from '@angular/core';
let SearchComponent = class SearchComponent {
    constructor(router) {
        this.router = router;
    }
    ngOnInit() {
    }
    doSearch(value) {
        console.log("value:" + value);
        this.router.navigateByUrl("/search/" + value);
    }
};
SearchComponent = __decorate([
    Component({
        selector: 'app-search',
        templateUrl: './search.component.html',
        styleUrls: ['./search.component.css']
    })
], SearchComponent);
export { SearchComponent };
//# sourceMappingURL=search.component.js.map