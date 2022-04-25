import { Component,NgZone, OnInit } from '@angular/core';
import {DatabaseService} from "../services/database.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../models/user";
import {Order} from "../models/order";
import {LoggedInUser} from "../models/LoggedInUser";
import {Router} from "@angular/router";


@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {

  user : User = new User();

  orders : Order[] =  [];
  order : Order = new Order();
  userName : string = '';
  id : number;

  constructor(private database: DatabaseService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private zone: NgZone) { }

  btnReceipt_click(){
    this.router.navigate(['receipt/' + this.id]);
  }

  UpdateOrder(orderId,entry, qty, price){

    this.order.orderId = orderId;
    this.order.entry = entry;
    this.order.qty = qty;
    this.order.price = price;
    this.order.userId = LoggedInUser.id;

    if(qty <= 0)
      alert("please enter the quantity or delete the item");
    else{
      console.log(this.order.entry, this.order.qty, this.order.price, this.order.orderId);
      this.database.update(this.order, () => {
        alert("Order Updated successfully");
      });
    }
  }

  DeleteOrder(orderId){
    this.database.delete(orderId, ()=>{
      alert("Order deleted successfully");

      let currentUrl = this.router.url;
      this.zone.run(()=>{this.router.navigateByUrl('menu', {skipLocationChange: true})
        .then(() => {
        this.router.navigate([currentUrl])}
        )});
    });
  }

  ngOnInit(): void {

    this.id  = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    console.log(this.id);
    // this.database.select(LoggedInUser.id)
    this.database.select(this.id)
      .then((data)=>{
        this.user = data;

        console.log(this.user);
        this.userName = ("Ready To Order "+this.user.firstName+"?");
      })
      .catch((e)=>{
        console.error(e);
      });

    this.database.selectAllOrders(this.id)
      .then(data => {
        this.orders = data;
        if(this.orders.length != 0)
        {
          document.getElementById('items').style.display = 'block';
          document.getElementById('itemHeader').style.display = 'block';
          document.getElementById('empty').style.display = 'none';
        }
        console.log(data);
      })
      .catch(error=>{
        console.log(error);
      });
  }
}
