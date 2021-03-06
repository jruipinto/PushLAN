import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { DeveloperCreditComponent } from './components/developer-credit/developer-credit.component';
import { BackgroundIllustrationComponent } from './components/background-illustration/background-illustration.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { ListItemComponent } from './components/list-item/list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadButtonComponent,
    DeveloperCreditComponent,
    BackgroundIllustrationComponent,
    AddressBarComponent,
    ListItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
