import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DatabaseService} from "../services/database.service";
import {Router} from "@angular/router";
import {LoggedInUser} from "../models/LoggedInUser";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  user: User = new User();
  loginForm!: FormGroup;

  onLogout(){
    LoggedInUser.id = -1;
    console.log("u are about to log out"+ LoggedInUser.id);
    this.ngOnInit();
  }

  onLogin() {
    console.warn(this.loginForm.value);

    let email = this.loginForm.get('email').value;
    let password = this.loginForm.get('password').value;

    this.database.selectByEmailandPassword(email, password)
      .then((data) => {
        this.user = data;

        console.log(this.user);
        LoggedInUser.id = this.user.id;

        this.router.navigate(['menu']);

      })
      .catch((e) => {
        console.error(e);
        document.getElementById('error').style.display = 'block';
      });
  }

  constructor(private router: Router,
              private database: DatabaseService) {}

  ngOnInit(): void {

    if (LoggedInUser.id === -1) {

      document.getElementById('login').style.display = 'block';
      document.getElementById('logout').style.display = 'none';
      this.loginForm = new FormGroup({

        email: new FormControl('rmans@yahoo.com', [
          Validators.required, Validators.email]),
        password: new FormControl('Angoshtpa2', [
          Validators.required, Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}')])
      });
    }else
    {
      document.getElementById('logout').style.display = 'block';
    }


  }
}
