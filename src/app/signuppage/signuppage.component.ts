import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signuppage',
  templateUrl: './signuppage.component.html',
  styleUrls: ['./signuppage.component.css']
})


export class SignuppageComponent implements OnInit {


  user: User = new User();
  signupForm!: FormGroup;

  onSubmit(){
    console.warn(this.signupForm.value);

    this.user.firstName = this.signupForm.get('firstName').value;
    this.user.lastName = this.signupForm.get('lastName').value;
    this.user.email = this.signupForm.get('email').value;
    this.user.password = this.signupForm.get('passwordGroup').get('password').value;
    this.user.phone = this.signupForm.get('phone').value;
    this.user.zipcode = this.signupForm.get('zipCode').value;

    this.database.insert(this.user, () => {
      console.log("Record added successfully");
      alert("Account created successfully");

    });
    this.router.navigate(['login']);
  }

  constructor(private database : DatabaseService, private router: Router ) { }

  ngOnInit(): void {

    this.signupForm = new FormGroup({
      firstName : new FormControl('rose',[
        Validators.required, Validators.minLength(2), Validators.maxLength(10)]),
      lastName : new FormControl('mansouri', [
        Validators.required, Validators.minLength(2), Validators.maxLength(15) ]),
      email : new FormControl('rmans@yahoo.com',[
        Validators.required, Validators.email]),

      passwordGroup : new FormGroup({
        password: new FormControl('',[Validators.required,
          Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}')]),
        confirmPassword : new FormControl('', Validators.required )},
        {validators: this.PasswordMatch}),

      phone : new FormControl('1234567891', [
        Validators.required, Validators.pattern('[0-9]{10}')] ),
      zipCode : new FormControl('N1T 2A7',[
         Validators.pattern('[a-zA-Z][0-9][a-zA-Z] [0-9][a-zA-Z][0-9]')])

    });

  }

  PasswordMatch(group: AbstractControl): any {
    let password = group.get('password');
    let confirmPassword = group.get('confirmPassword');
    if (password.value != '' && confirmPassword.value != ''
      && password.value == confirmPassword.value) {
      return null;
    } else {
      return {'passwordMismatch': true}
    }
  }


}
