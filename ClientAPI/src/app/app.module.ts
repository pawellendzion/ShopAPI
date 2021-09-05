import { UserService } from './Services/user.service';
import { ActivatedComponentService } from './Services/activated-component.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './account/login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './account/register-page/register-page.component';
import { HttpErrorInterceptor } from './httpErrorInterceptor';
import { AccountComponent } from './account/account.component';
import { DetailsPageComponent } from './account/details-page/details-page.component';
import { UploadComponent } from './products/upload/upload.component';
import { LaptopFormComponent } from './products/upload/laptop-form/laptop-form.component';
import { LaptopBagFormComponent } from './products/upload/laptop-bag-form/laptop-bag-form.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { ProductsComponent } from './products/products.component';
import { SearchComponent } from './products/search/search.component';
import { LaptopFilterComponent } from './products/laptop-filter/laptop-filter.component';
import { LaptopBagFilterComponent } from './products/laptop-bag-filter/laptop-bag-filter.component';
import { DetailsComponent } from './products/details/details.component';
import { UsersComponent } from './users/users.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    RegisterPageComponent,
    AccountComponent,
    DetailsPageComponent,
    UploadComponent,
    LaptopFormComponent,
    LaptopBagFormComponent,
    ContactPageComponent,
    ProductsComponent,
    SearchComponent,
    LaptopFilterComponent,
    LaptopBagFilterComponent,
    DetailsComponent,
    UsersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:5001'],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true,
      deps: [ActivatedComponentService]
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
