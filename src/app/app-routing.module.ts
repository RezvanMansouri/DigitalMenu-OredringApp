import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {MenupageComponent} from "./menupage/menupage.component";
import {MappageComponent} from "./mappage/mappage.component";
import {AboutuspageComponent} from "./aboutuspage/aboutuspage.component";
import {LoginpageComponent} from "./loginpage/loginpage.component";
import {SignuppageComponent} from "./signuppage/signuppage.component";
import {CartPageComponent} from "./cart-page/cart-page.component";
import {ReceiptPageComponent} from "./receipt-page/receipt-page.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'home', component: HomepageComponent},
  {path: 'menu', component: MenupageComponent},
  {path: 'map', component: MappageComponent},
  {path: 'aboutus', component:AboutuspageComponent},
  {path: 'login', component:LoginpageComponent},
  {path: 'signup', component:SignuppageComponent},
  {path: 'cart/:id', component:CartPageComponent},
  {path: 'receipt/:id',component:ReceiptPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
