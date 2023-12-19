import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../common/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup = new FormGroup<any>('');
  constructor(private formBuilder: FormBuilder,private authService: AuthenticationService) {
  }
  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      register: this.formBuilder.group({
        fullName: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl('')
        })}
    );
  }
  registerButton(): void{
    let user: User = new User();
    user.fullName = this.registerFormGroup.controls['register'].get('fullName')?.value;
    user.username = this.registerFormGroup.controls['register'].get('username')?.value;
    user.password = this.registerFormGroup.controls['register'].get('password')?.value;

    this.authService.registerUser(user).subscribe({
      next: response => {
        console.log(`Your registration is completed: ${response.Name}`);
      },
      error: err => {
        console.error('Error occurred:', err); // Log the full error object
        alert(`There was an error during registration.`);
      }
    });
  }


}
