import { Component, OnInit, OnDestroy,EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  country: any[]  = []
  countryOfTheDay: any[] = []
  subR: any[] = []
  search: any = 0
  now = new Date()
  isHidden : boolean = true
  isShown : boolean = false
  constructor(private dataService: DataService){

  }

  ngOnInit(): void
  {
    /* ------ There we get One country depending on the day (could be random if the day is > 249) ------ */
    this.dataService.getCountry().subscribe(
      (data : any[] ) =>
      {
        let iteration : number = 0
        let DayOfNow = this.now.getDate()
        let MonthOfNow = this.now.getMonth()
        //We will get the number of the day ( 31 december is the number 365 )
        for(let i = 1; i<=12;i++)
        {
          //February is a month with maximum 29 days
          if(i==1)
          {
            for(let y=1;y<=29;y++)
            {
              if(i<MonthOfNow+1)
              {
                  iteration++
              }

            }
          }
          //There is 8 month with 31 days
          else if(i>=2 && i<=9)
          {
            for (let y=1;y<=31;y++)
            {
              if(i<MonthOfNow+1)
              {
                  iteration++
              }
            }
          }
          //The others have 30 days
          else
          {
            for (let y=1;y<30;y++)
            {
              if(i<MonthOfNow+1)
              {
                  iteration++
              }
            }
          }
        }

        iteration = iteration + DayOfNow//We finish with the days of this month
        //If the number is above the number of countries (249)
        if(iteration > data.length )
        {
          //We take a random number between 249 and 1 (technicaly it's not a country by day if we pass 249 but still fun)
          iteration = Math.floor(Math.random() * (249 - 1 + 1) + 1)
        }
        this.countryOfTheDay[0] = data[iteration-1]
      }
    )

    /* ------ There we get all the sub region existing to be chosen in advanced search ------ */
    this.dataService.getSubRegion().subscribe(
      (data : any[]) =>
      {
        this.subR = data
      }
    )
  }

  /* ------ There we switch the value to hide or show part of the HTML page ------ */
  ShowHidden() : void
  {
    this.isHidden=!this.isHidden
    this.isShown=!this.isShown
  }

  /* ------ There we take every data to use the advanced search function and get all countries answering our demand ------ */
  Advanced(): void
  {
    let NameS = (<HTMLInputElement>document.getElementById("NameSearch")).value
    let SubRName = (<HTMLInputElement>document.getElementById("SUB")).value
    let Popmin = (<HTMLInputElement>document.getElementById("minPop")).value
    let Popmax = (<HTMLInputElement>document.getElementById("maxPop")).value
    let Sizmax = (<HTMLInputElement>document.getElementById("max")).value
    let Sizmin = (<HTMLInputElement>document.getElementById("min")).value
    let landlock = (<HTMLInputElement>document.getElementById("land")).value
    let UN = (<HTMLInputElement>document.getElementById("UN")).value
    let DP = (<HTMLInputElement>document.getElementById("Dp")).value
    //We create other value to make them boolean (HTMLInputElement give a string so we make them any)
    let DPbool : any = DP
    let UNbool : any = UN
    let landbool : any = landlock
    //If "true" (string) then true (boolean) , If "false" then false, If "" then we don't care, will be managed by the function in data service
    if(landlock == "true")
    {
      landbool = true
    }
    else if(landlock == "false")
    {
      landbool = false
    }
    if(UN == "true")
    {
      UNbool = true
    }
    else if(UN == "false")
    {
      UNbool = false
    }
    if(DP == "true")
    {
      DPbool = true
    }
    else if(DP == "false")
    {
      DPbool = false
    }

    this.dataService.getCountryAdvanced(NameS, Popmax, Popmin, Sizmax, Sizmin, landbool, UNbool, DPbool, SubRName).subscribe(
      (data : any[]) =>
      {
      this.country = data
      }
    )
  }

}
