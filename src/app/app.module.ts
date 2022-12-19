import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component';

import { AboutComponent } from './about/about.component';
import { LanguagesComponent } from './languages/languages.component';
import { RegionsComponent } from './regions/regions.component';
import { FromComponent } from './from/from.component';
import { SpeakingComponent } from './speaking/speaking.component';
import { CurrencyComponent } from './currency/currency.component';
import { UsingComponent } from './using/using.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    LanguagesComponent,
    RegionsComponent,
    FromComponent,
    SpeakingComponent,
    CurrencyComponent,
    UsingComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
