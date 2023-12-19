import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormGroup: FormGroup = new FormGroup<any>('');
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
        login: this.formBuilder.group({
            username: new FormControl(''),
            password: new FormControl('')
        })
    });
  }
  loginButton(){
    let username:string = this.loginFormGroup.controls['login'].get('username')?.value;
    let password:string = this.loginFormGroup.controls['login'].get('password')?.value;
      this.authService.loginUser(username,password).subscribe({
          next: response => {
              console.log(`Successfully Logged in: ${response.username}` );
          },
          error: err => {
              console.error('Error occurred:', err); // Log the full error object
              alert(`There was an error during login.`);
          }
      });
  }

}
