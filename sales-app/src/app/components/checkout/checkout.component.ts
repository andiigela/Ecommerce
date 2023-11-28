import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ShopformService} from "../../services/shopform.service";
import {start} from "@popperjs/core";
import {Country} from "../../common/country";
import {State} from "../../common/state";

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
  constructor(private formBuilder: FormBuilder,private shopForm: ShopformService) {
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
            firstName: new FormControl('',[Validators.required,Validators.minLength(2)]),
            lastName: new FormControl('',[Validators.required,Validators.minLength(2)]),
            email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
        }),
        shippingAddress: this.formBuilder.group({
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
        }),
        billingAddress: this.formBuilder.group({
            street: '',
            city: '',
            state: '',
            country: '',
            zipCode: '',
        }),
        creditCard: this.formBuilder.group({
          cardType: '',
          nameOnCard: '',
          cardNumber: '',
          securityCode: '',
          expirationMonth: '',
          expirationYear: '',
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

  onSubmit(){
    console.log('Handling the submit button');
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('shippingAddress')?.value.zipCode);
    console.log(`Shipping Address Country is: ${this.checkoutFormGroup.get('shippingAddress')?.value.country.name}`);
    console.log(`Billing Address Country is: ${this.checkoutFormGroup.get('billingAddress')?.value.country.name}`);
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

}
