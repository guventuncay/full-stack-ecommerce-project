import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { PopulateServiceService } from 'src/app/services/populate-service.service';
import { CustomValidators } from 'src/app/validators/custom-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(
    private formBuilder: FormBuilder, private populateService: PopulateServiceService,
    private cartService: CartService, private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        lastName: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        email: new FormControl("", [Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")])
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        city: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        state: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        city: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        state: new FormControl("", [Validators.required]),
        country: new FormControl("", [Validators.required]),
        zipCode: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl("", [Validators.required]),
        nameOnCard: new FormControl("", [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhitespace]),
        cardNumber: new FormControl("", [Validators.required, Validators.pattern("[0-9]{16}")]),
        securityCode: new FormControl("", [Validators.required, Validators.pattern("[0-9]{3}")]),
        expirationMonth: [""],
        expirationYear: [""]
      })
    });

    // populate credit card months and years
    const START_MONTH: number = new Date().getMonth() + 1;
    console.log("startMonth: " + START_MONTH);

    this.populateService.getCreditCardMonths(START_MONTH).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    this.populateService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    // populate countries

    this.populateService.getCountries().subscribe(

      data => {
        console.log("Retrieved countries: " + JSON.stringify(data));
        this.countries = data;
      }
    );

    this.reviewCartDetails();
  }

  onSubmit() {
    console.log("Handling the submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const CART_ITEMS = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = CART_ITEMS.map(data => new OrderItem(data));

    // set up purchase
    let purchase = new Purchase();

    // populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls["customer"].value;

    // populate purchase - shippingAddress
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    purchase.shippingAddress = this.checkoutFormGroup.controls["shippingAddress"].value;
    let shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    let shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    // populate purchase - billingAddress
    // <><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><><>
    purchase.billingAddress = this.checkoutFormGroup.controls["billingAddress"].value;
    let billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    let billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    // populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;

    // call restAPI via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
        next: response => {
          alert("Your order has been received.\nOrder tracking number: " + response.orderTrackingNumber);

          // reset cart
          this.resetCart();
        },
        error: error => {
          alert("There was an error: " + error.message);
        }
      }
    )

  }
  resetCart() {

    // reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    // reset the form data
    this.checkoutFormGroup.reset();

    // navigate back to the product page
    this.router.navigateByUrl("/products");
  }

  copyShippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
      this.billingAddressStates = this.shippingAddressStates;
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();
      this.billingAddressStates = [];
    }
  }

  handleMonthsAndYears() {
    const CREDIT_CARD_FORM_GROUP = this.checkoutFormGroup.get("creditCard");
    const CURRENT_YEAR: number = new Date().getFullYear();
    const SELECTED_YEAR: number = Number(CREDIT_CARD_FORM_GROUP.value.expirationYear);

    // if the currenmt year equals the selected year, then start with a current month

    let startMonth: number;

    if (CURRENT_YEAR === SELECTED_YEAR)
      startMonth = new Date().getMonth() + 1;
    else
      startMonth = 1;

    this.populateService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
  }

  reviewCartDetails() {
    // subscribe to cartService totalQuantity and totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    )
  }

  getStates(formGroupName: string) {
    const FORM_GROUP = this.checkoutFormGroup.get(formGroupName);

    const COUNTRY_CODE = FORM_GROUP.value.country.code;
    const COUNTRY_NAME = FORM_GROUP.value.country.name;

    console.log(formGroupName + " Country code: " + COUNTRY_CODE);
    console.log(formGroupName + " Country name: " + COUNTRY_NAME);

    this.populateService.getStates(COUNTRY_CODE).subscribe(
      data => {

        if (formGroupName === "shippingAddress")
          this.shippingAddressStates = data;
        else
          this.billingAddressStates = data;

        // set first item by default
        FORM_GROUP.get("state").setValue(data[0]);
      }
    );
  }

  get firstName() { return this.checkoutFormGroup.get("customer.firstName"); }
  get lastName() { return this.checkoutFormGroup.get("customer.lastName"); }
  get email() { return this.checkoutFormGroup.get("customer.email"); }

  get shippingAddressStreet() { return this.checkoutFormGroup.get("shippingAddress.street"); }
  get shippingAddressCity() { return this.checkoutFormGroup.get("shippingAddress.city"); }
  get shippingAddressState() { return this.checkoutFormGroup.get("shippingAddress.state"); }
  get shippingAddressCountry() { return this.checkoutFormGroup.get("shippingAddress.country"); }
  get shippingAddressZipCode() { return this.checkoutFormGroup.get("shippingAddress.zipCode"); }

  get billingAddressStreet() { return this.checkoutFormGroup.get("billingAddress.street"); }
  get billingAddressCity() { return this.checkoutFormGroup.get("billingAddress.city"); }
  get billingAddressState() { return this.checkoutFormGroup.get("billingAddress.state"); }
  get billingAddressCountry() { return this.checkoutFormGroup.get("billingAddress.country"); }
  get billingAddressZipCode() { return this.checkoutFormGroup.get("billingAddress.zipCode"); }

  get creditCardType() { return this.checkoutFormGroup.get("creditCard.cardType"); }
  get creditCardNameOnCard() { return this.checkoutFormGroup.get("creditCard.nameOnCard"); }
  get creditCardNumber() { return this.checkoutFormGroup.get("creditCard.cardNumber"); }
  get creditCardSecurityCode() { return this.checkoutFormGroup.get("creditCard.securityCode"); }

}