import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { DownloadButtonComponent } from './components/download-button/download-button.component';
import { DeveloperCreditComponent } from './components/developer-credit/developer-credit.component';
import { BackgroundIllustrationComponent } from './components/background-illustration/background-illustration.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadButtonComponent,
    DownloadButtonComponent,
    DeveloperCreditComponent,
    BackgroundIllustrationComponent,
    AddressBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
