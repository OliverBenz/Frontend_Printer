import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddComponent } from './add/add.component';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login-site/login/login.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { AccountComponent } from './account/account.component';
import { AccstatisticsComponent } from './account/accstatistics/accstatistics.component';
import { AccfinanceComponent } from './account/accfinance/accfinance.component';
import { StreamComponent } from './stream/stream.component';
import { AccprintsComponent } from './account/accprints/accprints.component';

import { FileSelectDirective } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
import { LoginSiteComponent } from './login-site/login-site.component';
import { RegisterComponent } from './login-site/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    AddComponent,
    IndexComponent,
    HeaderComponent,
    LoginComponent,
    StatisticsComponent,
    AccountComponent,
    AccstatisticsComponent,
    AccfinanceComponent,
    StreamComponent,
    AccprintsComponent,
    FileSelectDirective,
    LoginSiteComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
