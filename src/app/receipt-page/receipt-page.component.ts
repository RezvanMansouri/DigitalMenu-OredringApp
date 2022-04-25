import {Component, NgZone, OnInit} from '@angular/core';
import {User} from "../models/user";
import {Order} from "../models/order";
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-receipt-page',
  templateUrl: './receipt-page.component.html',
  styleUrls: ['./receipt-page.component.css']
})
export class ReceiptPageComponent implements OnInit {

  user : User = new User();

  orders : Order[] =  [];
  order : Order = new Order();
  userName : string = '';
  userId : number;
  total : number = 0;
  constructor(private database: DatabaseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private zone: NgZone) { }


  ngOnInit(): void {

     this.userId  = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.userId);
    this.database.select(this.userId)
      .then((data)=>{
        this.user = data;

        console.log(this.user);
        this.userName = ("Thanks for your order "+this.user.firstName+"!");
      })
      .catch((e)=>{
        console.error(e);
      });

    this.database.selectAllOrders(this.userId)
      .then(data => {
        this.orders = data;

        this.orders.forEach(element =>
         this.total +=  element.qty * element.price );



        console.log(data);
      })
      .catch(error=>{
        console.log(error);
      });


    this.database.delete(this.userId, ()=>{
    });
  }
}
