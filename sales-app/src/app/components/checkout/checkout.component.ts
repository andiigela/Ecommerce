import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShopformService} from "../../services/shopform.service";
import {start} from "@popperjs/core";

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
  constructor(private formBuilder: FormBuilder,private shopForm: ShopformService) {
  }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
            firstName: '',
            lastName: '',
            email: '',
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
  }
  onSubmit(){
    console.log('Handling the submit button');
    console.log(this.checkoutFormGroup.get('shippingAddress')?.value.zipCode);
  }
  copyShippingAddressToBillingAddress(event: any){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress'].setValue(this.checkoutFormGroup.controls['shippingAddress'].value)
    }else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
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


}
