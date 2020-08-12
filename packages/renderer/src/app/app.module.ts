import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { NgxElectronModule } from 'ngx-electron';
import { QRCodeModule } from 'angularx-qrcode';

import { AppComponent } from './app.component';
import { DeveloperCreditComponent } from './components/developer-credit/developer-credit.component';
import { ShareIconComponent } from './components/share-icon/share-icon.component';
import { StartIconComponent } from './components/start-icon/start-icon.component';
import { StopIconComponent } from './components/stop-icon/stop-icon.component';
import { BackgroundIlustrationComponent } from './components/background-ilustration/background-ilustration.component';

@NgModule({
  declarations: [
    AppComponent,
    DeveloperCreditComponent,
    ShareIconComponent,
    StartIconComponent,
    StopIconComponent,
    BackgroundIlustrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
