import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { LanguagesComponent } from './languages/languages.component';
import { RegionsComponent } from './regions/regions.component';
import { FromComponent } from './from/from.component';
import { SpeakingComponent } from './speaking/speaking.component';
import { CurrencyComponent } from './currency/currency.component';
import { UsingComponent } from './using/using.component';
import { DetailComponent } from './detail/detail.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home' },
  {path: 'home', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'languages', component: LanguagesComponent},
  {path: 'regions', component: RegionsComponent},
  {path: 'From/:Region', component: FromComponent},
  {path: 'Speaking/:Language', component: SpeakingComponent},
  {path: 'currency', component: CurrencyComponent},
  {path: 'Using/:currency', component: UsingComponent},
  {path: 'Detail/:Name', component: DetailComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
