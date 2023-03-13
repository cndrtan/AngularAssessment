import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxBootstrapIconsModule, cart } from 'ngx-bootstrap-icons';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterComponent } from './filter/filter.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { DetailProductComponent } from './detail-product/detail-product.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';

const icons = {
  cart
};

const routes: Routes = [
  { path: 'product', component: ProductComponent },
  { path: 'detail-product/:id', component: DetailProductComponent},
  { path: '', redirectTo: 'product', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    DetailProductComponent,
    NavbarComponent,
    FooterComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    RouterModule.forRoot(routes),
    NgxBootstrapIconsModule.pick(icons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
