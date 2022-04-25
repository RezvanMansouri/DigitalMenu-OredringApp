import { Component, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user";
import {Order} from "../models/order";
import {LoggedInUser} from "../models/LoggedInUser";
import {Router} from "@angular/router";


@Component({
  selector: 'app-menupage',
  templateUrl: './menupage.component.html',
  styleUrls: ['./menupage.component.css']
})


export class MenupageComponent implements OnInit {

  user: User = new User();
  order: Order = new Order();
  o: Order;

  userName: string = ''

  constructor(private database: DatabaseService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }


  AddOrder(entry, qty, price){

    this.order.entry = entry;
    this.order.qty = qty;
    this.order.price = price;
    this.order.userId = LoggedInUser.id;
    if(qty <= 0)
      alert("please enter the quantity");
    else{
      console.log(this.order.entry, this.order.qty, this.order.price, this.order.orderId);
      this.database.insertOrder(this.order, () => {
        console.log("Record added to orders successfully");
        alert("The order has been added to your cart");
      });
    }
  }

  btnCart_click() {
    this.router.navigate(['cart/' + LoggedInUser.id]);
  }

  ngOnInit(): void {

    this.database.select(LoggedInUser.id)
      .then((data)=>{
        this.user = data;

        console.log(this.user);
        this.userName = ("Welcome Back "+this.user.firstName+"!");
      })
      .catch((e)=>{
        console.error(e);
       alert("You need to sign in to order food");
        this.router.navigate(['login']);
      });


  }

}
