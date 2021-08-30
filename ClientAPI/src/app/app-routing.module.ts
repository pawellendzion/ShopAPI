import { DetailsComponent } from './products/details/details.component';
import { ProductsComponent } from './products/products.component';
import { ContactPageComponent } from './contact-page/contact-page.component';
import { UploadGuard } from './products/upload/guard-upload';
import { UploadComponent } from './products/upload/upload.component';
import { DetailsPageComponent } from './account/details-page/details-page.component';
import { accountGuard } from './account/guard';
import { AccountComponent } from './account/account.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegisterPageComponent } from './account/register-page/register-page.component';
import { LoginPageComponent } from './account/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent, pathMatch: 'full'},
  {path: 'products/upload', component: UploadComponent, pathMatch: 'full', canActivate: [UploadGuard]},
  {path: 'contact', component: ContactPageComponent, pathMatch: 'full'},
  {path: 'products', component: ProductsComponent, pathMatch: 'full'},
  {path: 'products/details/:id', component: DetailsComponent},
  {path: 'account', component: AccountComponent, canActivate: [accountGuard], children: [
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'details', component: DetailsPageComponent}
  ]},
  {path: '**', redirectTo: 'main'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [accountGuard, UploadGuard]
})
export class AppRoutingModule { }
