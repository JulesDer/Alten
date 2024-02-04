import {registerLocaleData} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from 'app/app-routing.module';
import {AppComponent} from 'app/app.component';
import {BaseModule} from 'app/base/base.module';
import {SharedModule} from 'app/shared/shared.module';
import {ProductsComponent} from './products/products.component';
import {ProductsAdminComponent} from './products-admin/products-admin.component';
import {ButtonModule} from 'primeng/button';
import {TagModule} from 'primeng/tag';
import {RatingModule} from 'primeng/rating';
import {DataViewModule} from 'primeng/dataview';
import {TableModule} from 'primeng/table';
import {ProductCreateComponent} from './product-create/product-create.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';


@NgModule({
  declarations: [AppComponent, ProductsComponent, ProductsAdminComponent, ProductCreateComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    BaseModule,
    DataViewModule,
    RatingModule,
    TagModule,
    ButtonModule,
    TableModule,
    ConfirmDialogModule,
    InputTextModule,
    RadioButtonModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'en'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localeEn, 'en');
  }
}
