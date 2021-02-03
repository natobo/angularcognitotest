import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RestApiComponent } from './restapi/restapi.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from "@angular/http";
import { AuthorizationService } from "./shared/authorization.service";
import { FormsModule } from "@angular/forms";
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProductListComponent } from './shopping-cart/product-list/product-list.component';
import { ProductItemComponent } from './shopping-cart/product-list/product-item/product-item.component';
import { CartComponent } from './shopping-cart/cart/cart.component';
import { FiltersComponent } from './shopping-cart/filters/filters.component';
import { CartItemComponent } from './shopping-cart/cart/cart-item/cart-item.component';
import { MessengerService } from './shared/messenger.service';
import { ProductService } from './shared/product.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    RestApiComponent, ShoppingCartComponent, ProductListComponent, ProductItemComponent, CartComponent, FiltersComponent, CartItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    FormsModule
  ],
  providers: [AuthorizationService,
    MessengerService,
    ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
