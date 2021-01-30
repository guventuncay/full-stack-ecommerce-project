import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CheckoutComponent = class CheckoutComponent {
    constructor(formBuilder) {
        this.formBuilder = formBuilder;
        this.totalPrice = 0;
        this.totalQuantity = 0;
    }
    ngOnInit() {
        this.checkoutFormGroup = this.formBuilder.group({
            customer: this.formBuilder.group({
                firstName: [""],
                lastName: [""],
                email: [""]
            }),
            shippingAddress: this.formBuilder.group({
                street: [""],
                city: [""],
                state: [""],
                country: [""],
                zipCode: [""]
            }),
            billingAddress: this.formBuilder.group({
                street: [""],
                city: [""],
                state: [""],
                country: [""],
                zipCode: [""]
            }),
            creditCard: this.formBuilder.group({
                cardType: [""],
                nameOnCard: [""],
                cardNumber: [""],
                securityCode: [""],
                expirationMonth: [""],
                expirationYear: [""]
            }),
        });
    }
    onSubmit() {
        console.log("Handling the submit button");
        console.log(this.checkoutFormGroup.get("customer").value);
        console.log("email:" + this.checkoutFormGroup.get("customer").value.email);
    }
    copyShippingAddressToBillingAddress(event) {
        if (event.target.checked)
            this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
        else
            this.checkoutFormGroup.controls.billingAddress.reset();
    }
};
CheckoutComponent = __decorate([
    Component({
        selector: 'app-checkout',
        templateUrl: './checkout.component.html',
        styleUrls: ['./checkout.component.css']
    })
], CheckoutComponent);
export { CheckoutComponent };
//# sourceMappingURL=checkout.component.js.map