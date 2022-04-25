import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import { ReactiveFormsModule} from "@angular/forms";
import {NavComponent} from './nav/nav.component';
import {HomepageComponent} from './homepage/homepage.component';
import { MenupageComponent } from './menupage/menupage.component';
import { MappageComponent } from './mappage/mappage.component';
import { AboutuspageComponent } from './aboutuspage/aboutuspage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { SignuppageComponent } from './signuppage/signuppage.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ReceiptPageComponent } from './receipt-page/receipt-page.component';



@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomepageComponent,
    MenupageComponent,
    MappageComponent,
    AboutuspageComponent,
    LoginpageComponent,
    SignuppageComponent,
    CartPageComponent,
    ReceiptPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent, HomepageComponent]
})
export class AppModule {
}
