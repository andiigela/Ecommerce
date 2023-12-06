import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopformService} from "../../services/shopform.service";
import {start} from "@popperjs/core";
import {Country} from "../../common/country";
import {State} from "../../common/state";
import {FormValidators} from "../../validators/form-validators";
import {CartService} from "../../services/cart.service";
import {CheckoutService} from "../../services/checkout.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  checkoutFormGroup: FormGroup = new FormGroup<any>('');
  totalPrice: number = 0;
  totalQuantity: number = 0;
  creditCardYears: number[]=[];
  creditCardMonths: number[]=[];
  countries : Country[] = [];
  shippingAddressStates: State[]=[];
  billingAddressStates: State[]=[];
  constructor(private formBuilder: FormBuilder,private shopForm: ShopformService,
              private cartService:CartService,private checkoutService: CheckoutService,private router: Router) {
  }

  ngOnInit(): void {
    this.reviewCartDetails();
    this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
            firstName: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
            lastName: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
            email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),FormValidators.notOnlyWhiteSpaces]),
        }),
        shippingAddress: this.formBuilder.group({
            street: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
            city: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
            state: new FormControl('',[Validators.required]),
            country: new FormControl('',[Validators.required]),
            zipCode: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
        }),
        billingAddress: this.formBuilder.group({
            street: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
            city: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
            state: new FormControl('',[Validators.required]),
            country: new FormControl('',[Validators.required]),
            zipCode: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
        }),
        creditCard: this.formBuilder.group({
          cardType: new FormControl('',[Validators.required]),
          nameOnCard: new FormControl('',[Validators.required,Validators.minLength(2),FormValidators.notOnlyWhiteSpaces]),
          cardNumber: new FormControl('',[Validators.required,Validators.pattern('[0-9]{16}')]),
          securityCode: new FormControl('',[Validators.required,Validators.pattern('[0-9]{3}')]),
          expirationMonth: new FormControl('',[Validators.required]),
          expirationYear: new FormControl('',[Validators.required]),
        }),
      });
    const startMonth: number = new Date().getMonth() + 1;
    this.shopForm.getCreditCardMonths(startMonth).subscribe(data => this.creditCardMonths = data);
    this.shopForm.getCreditCardYears().subscribe(data => this.creditCardYears = data);
    this.shopForm.retrieveCountries().subscribe(countries => this.countries=countries);

  }
  get firstName(){return this.checkoutFormGroup.get('customer.firstName');}
  get lastName(){return this.checkoutFormGroup.get('customer.lastName');}
  get email(){return this.checkoutFormGroup.get('customer.email');}
  get shippingAddressStreet(){return this.checkoutFormGroup.get('shippingAddress.street');}
  get shippingAddressCity(){return this.checkoutFormGroup.get('shippingAddress.city');}
  get shippingAddressState(){return this.checkoutFormGroup.get('shippingAddress.state');}
  get shippingAddressCountry(){return this.checkoutFormGroup.get('shippingAddress.country');}
  get shippingAddressZipCode(){return this.checkoutFormGroup.get('shippingAddress.zipCode');}
  get billingAddressStreet(){return this.checkoutFormGroup.get('billingAddress.street');}
  get billingAddressCity(){return this.checkoutFormGroup.get('billingAddress.city');}
  get billingAddressState(){return this.checkoutFormGroup.get('billingAddress.state');}
  get billingAddressCountry(){return this.checkoutFormGroup.get('billingAddress.country');}
  get billingAddressZipCode(){return this.checkoutFormGroup.get('billingAddress.zipCode');}
  get creditCardType(){return this.checkoutFormGroup.get('creditCard.cardType')}
  get creditCardName(){return this.checkoutFormGroup.get('creditCard.nameOnCard')}
  get creditCardNumber(){return this.checkoutFormGroup.get('creditCard.cardNumber')}
  get creditCardSecurityCode(){return this.checkoutFormGroup.get('creditCard.securityCode')}
  get creditCardExpirationMonth(){return this.checkoutFormGroup.get('creditCard.expirationMonth')}
  get creditCardExpirationYear(){return this.checkoutFormGroup.get('creditCard.expirationYear')}

  onSubmit(){
    console.log('Handling the submit button');
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }



    // console.log(this.checkoutFormGroup.get('shippingAddress')?.value.zipCode);
    // console.log(`Shipping Address Country is: ${this.checkoutFormGroup.get('shippingAddress')?.value.country.name}`);
    // console.log(`Billing Address Country is: ${this.checkoutFormGroup.get('billingAddress')?.value.country.name}`);
  }
  copyShippingAddressToBillingAddress(event: any){
    if(event.target.checked){
        this.billingAddressStates = this.shippingAddressStates;
        this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
      this.billingAddressStates = [];
    }
  }
  handleMonthsAndYears(){
    let currentYear: number = new Date().getFullYear(); // 2023
    let selectedYear: number = Number(this.checkoutFormGroup.controls['creditCard'].value.expirationYear); // 2023

    let startMonth: number = 1;
    if(currentYear == selectedYear){
      startMonth = new Date().getMonth() + 1;
    }
    this.shopForm.getCreditCardMonths(startMonth).subscribe(data => this.creditCardMonths=data);
  }
  getStates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;
    console.log(`{formgroupName} country code: ${countryCode}`);
    console.log(`{formgroupName} country code: ${countryName}`);
    this.shopForm.retrieveStates(countryCode).subscribe(
      data=>{
        if(formGroupName === 'shippingAddress'){
          this.shippingAddressStates = data;
          this.checkoutFormGroup.get('shippingAddress')?.get('state')?.setValue(data[0]);
        } else {
          this.billingAddressStates = data;
          this.checkoutFormGroup.get('billingAddress')?.get('state')?.setValue(data[0]);
        }
      }
    );
  }
  reviewCartDetails(){
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity=data);
    this.cartService.totalPrice.subscribe(data => this.totalPrice=data);
  }

}
