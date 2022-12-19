import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, filter, switchMap } from 'rxjs';
import { TmplAstBoundAttribute } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class
DataService {

    protected Country: any[] = []
    constructor(private httpClient: HttpClient) { }

    /* ------ This function get every country from the API and prepare the data ------ */
    getCountry(): Observable<any[]>
    {
       return(this.httpClient.get<any[]>('https://restcountries.com/v3.1/all').pipe(
        map((tab: any[]) =>
        {
          const newArray: any[] = []
          //Create const to give value to country without them
          const VoidLangue = { itsVoid : "Without Official Language" }
          const VoidCurrency = { itsVoid : {name: "Without Currency", symbol: "n"} }
          const VoidCapital = { itsVoid : "null"}
          const VoidsubRegion = {itsVoid: "null"}
          const VoidimgArmy = null
          for(let i=0; i < tab.length;i++)
          {
            //There is countries without languages and other without currencies even one without both and more, so
            // we give them another value to use the other function with them
            // we can use ngif to take them out if needed on HTML
              if(tab[i]['coatOfArms']['png']==null && tab[i]['languages']==null && tab[i]['currencies']==null)
              {
                let newElem =
                {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : VoidLangue,
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                  currency : VoidCurrency,
                  capital : VoidCapital['itsVoid'],
                  subRegion : VoidsubRegion['itsVoid'],
                  unMember : tab[i]['unMember'],
                  independent : tab[i]['independent'],
                  landlocked : tab[i]['landlocked'],
                  imgArmy : VoidimgArmy
                }
                newArray.push(newElem)
              }
              else if(tab[i]['coatOfArms']['png']==null && tab[i]['languages']==null)
              {
                let newElem =
                {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : VoidLangue,
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                  currency : tab[i]['currencies'],
                  capital : tab[i]['capital'],
                  subRegion : tab[i]['subregion'],
                  unMember : tab[i]['unMember'],
                  independent : tab[i]['independent'],
                  landlocked : tab[i]['landlocked'],
                  imgArmy : VoidimgArmy
                }
                newArray.push(newElem)
              }
              else if(tab[i]['languages']==null && tab[i]['currencies']==null)
              {
                let newElem =
                {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : VoidLangue,
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                  currency : VoidCurrency,
                  capital : VoidCapital['itsVoid'],
                  subRegion : VoidsubRegion['itsVoid'],
                  unMember : tab[i]['unMember'],
                  independent : tab[i]['independent'],
                  landlocked : tab[i]['landlocked'],
                  imgArmy : tab[i]['coatOfArms']['png']
                }
                newArray.push(newElem)
              }
              else if(tab[i]['languages']==null)
              {
                let newElem =
                {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : VoidLangue,
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                  currency : tab[i]['currencies'],
                  capital : tab[i]['capital'],
                  subRegion : tab[i]['subregion'],
                  unMember : tab[i]['unMember'],
                  independent : tab[i]['independent'],
                  landlocked : tab[i]['landlocked'],
                  imgArmy : tab[i]['coatOfArms']['png']
                }
                newArray.push(newElem)
              }
              else if(tab[i]['currencies']==null)
              {
                let newElem =
                {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : VoidLangue,
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                  currency : VoidCurrency,
                  capital : tab[i]['capital'],
                  subRegion : tab[i]['subregion'],
                  unMember : tab[i]['unMember'],
                  independent : tab[i]['independent'],
                  landlocked : tab[i]['landlocked'],
                  imgArmy : tab[i]['coatOfArms']['png']
                }
                newArray.push(newElem)
              }
            //else => If everything is alright
              else
              {
                let newElem =
                {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : tab[i]['languages'],
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                  currency : tab[i]['currencies'],
                  capital : tab[i]['capital'],
                  subRegion : tab[i]['subregion'],
                  unMember : tab[i]['unMember'],
                  independent : tab[i]['independent'],
                  landlocked : tab[i]['landlocked'],
                  imgArmy : tab[i]['coatOfArms']['png']
                }
                newArray.push(newElem)
              }
          }
          return(newArray)
        },
        )
      )
      )
    }

    /* ------ This function get every region name only once ------ */
    getRegion(): Observable<any[]>
    {
      return(this.getCountry().pipe(
        map((country : any[]) =>
        {
          const countryR : any[] = country
          const regionArray: any[] = []
          let doyouAdd: boolean = true
          for(let i=0;i<countryR.length;i++)
          {
            //Reset the value of doYouAdd if it changed inside the 2nd FOR
            doyouAdd = true
            //We compare each gained region to see if it was already added
            for(let j=0;j<regionArray.length;j++)
            {//.region return one tab with only 1 value ex:['Europe'], so .region[0] is the STRING 'Europe' for example
              if(regionArray[j]==countryR[i].region[0])
              {
                //If the region is already writen then no need to add it
                doyouAdd = false
              }
            }
            if(doyouAdd == true)
            {
              regionArray.push(countryR[i].region[0])
            }
          }
          return(regionArray)
        }
       )
      ))
    }

    /* ------ This function get every sub region name once only ------ */
    getSubRegion(): Observable<any[]>
    {
      return(this.getCountry().pipe(
        map((country : any[]) =>
        {
          const countryR : any[] = country
          const SubregionArray: any[] = []
          let doyouAdd: boolean = true
          for(let i=0;i<countryR.length;i++)
          {
            doyouAdd = true
            if(countryR[i].subRegion != null && countryR[i].subRegion != "null")
            {
              for(let j=0;j<SubregionArray.length;j++)
              {
                if(SubregionArray[j]==countryR[i].subRegion)
                {
                  doyouAdd = false
                }
              }
              if(doyouAdd == true)
              {
                SubregionArray.push(countryR[i].subRegion)
              }
            }
          }
          return(SubregionArray)
        }
       )
      ))
    }

    /* ------ This function get every language only once and there number of country using it ------ */
    getLanguage(): Observable<any[]>
    {
      return(this.getCountry().pipe(
        map((country : any[]) =>
        {
          const countryR : any[] = country
          const languageArray: any[] = []
          let doyouAdd: boolean = true
          const languageArrayFinal : any[] = []
          let iteration : number = 0
          for(let i=0;i<countryR.length;i++)
          {
            doyouAdd = true
            for(let j=0;j<languageArray.length;j++)
            {
              //The value [0][0] is different for each language 'ENG', 'FR', 'RUS' etc... we take the full name [0][1]
              if(languageArray[j]==(Object.entries(countryR[i].language)[0][1]))
              {
                doyouAdd = false
              }
            }
            if(doyouAdd == true)
            {
              languageArray.push(Object.entries(countryR[i].language)[0][1])
            }
          }
          //At the end we also want the number of user for this languages
          //so lets do it there instead of calling this again
          for (let z=0;z<languageArray.length;z++)
          {
            //Lets save the number of country using this languages in a variable
            iteration = 0
            for(let y=0; y<countryR.length; y++)
            {
              //We need to check every official (not only the 1st) language of each country
              for(let w=0;w<Object.entries(countryR[y].language).length;w++)
              {
                if(languageArray[z]==Object.entries(countryR[y].language)[w][1])
                {
                  iteration++
                }
              }
            }
            //We will have ['NameOfLanguage', NumberOfCountriesUser]
            languageArrayFinal.push([languageArray[z],iteration])
          }
          return(languageArrayFinal)
        }
       )
      ))
    }

    /* ------ This function get every currency only once ------ */
    getCurrency(): Observable<any[]>
    {
      return(this.getCountry().pipe(
        map((country : any[]) =>
        {
          const countryR : any[] = country
          const currencyArray: any[] = []
          let doyouAdd: boolean = true
          let iteration: number = 0
          let objectCurrency : any = ""
          const currencyArrayFinal : any[] = []
          for(let i=0;i<countryR.length;i++)
          {
            doyouAdd = true
            //Currencies have an object with a name different,
            //so we jump it (we can't do Object.entries(Object.entries) but we can with a variable)
            objectCurrency = Object.entries(countryR[i].currency)[0][1]
            for(let j=0;j<currencyArray.length;j++)
            {//
              if(currencyArray[j]==(Object.entries(objectCurrency)[0][1]))
              {
                doyouAdd = false
              }
            }
            if(doyouAdd == true)
            {

              currencyArray.push(Object.entries(objectCurrency)[0][1])
            }

          }
          //At the end we also want the number of user so lets do it there
          for (let z=0;z<currencyArray.length;z++)
          {
            iteration = 0
            for(let y=0; y<countryR.length; y++)
            {
              //We need to check every official (not only the 1st) currency of each country
              objectCurrency =  Object.entries(countryR[y].currency)[0][1]
              for(let w=0;w<Object.entries(objectCurrency).length;w++)
              {
                if(currencyArray[z]==Object.entries(objectCurrency)[w][1])
                {
                  iteration++
                }
              }
            }
            currencyArrayFinal.push([currencyArray[z],iteration])
          }
          return(currencyArrayFinal)
        }
       )
      ))
    }

    /* ------ This function take a region and return all countries FROM this region  ------ */
    getCountryFilteredByRegion(regionL: string) : Observable<any[]>
    {
      return (this.getCountry().pipe(
          map((country : any[]) =>
          {
            let countryF : any[] = []
            let NumberFound: number = 0
            for(let i=0;i<country.length;i++)
            {
              if(country[i].region == regionL)
              {
                //There we create a variable independent from i to start at [0] until the last
                countryF[NumberFound]=country[i]
                NumberFound++
              }
            }
            return(countryF)
          }),
        )
      )
    }

    /* ------ This function take a language and return all countries SPEAKING this language ------ */
    getCountryFilteredByLanguage(LanguageL: string) : Observable<any[]>
    {
      return (this.getCountry().pipe(
          map((country : any[]) =>
          {
            let countryF : any[] = []
            let NumberFound: number = 0
            for(let i=0;i<country.length;i++)
            {
              for(let j=0;j<Object.entries(country[i].language).length;j++)
              {
                if(Object.entries(country[i].language)[j][1] == LanguageL)
                {
                  countryF[NumberFound]=country[i]
                  NumberFound++
                }
              }
            }
            return(countryF)
          }),
        )
      )
    }

    /* ------ This function take a currency and return all countries USING this currency ------ */
    getCountryFilteredByCurrency(CurrencyL: string) : Observable<any[]>
    {
      return (this.getCountry().pipe(
          map((country : any[]) =>
          {
            let countryF : any[] = []
            let NumberFound: number = 0
            let objectCurrency : any = ""
            for(let i=0;i<country.length;i++)
            {
              for(let j=0;j<Object.entries(country[i].currency).length;j++)
              {
                objectCurrency = Object.entries(country[i].currency)[j][1]
                if(CurrencyL==Object.entries(objectCurrency)[0][1])
                {
                  countryF[NumberFound]=country[i]
                  NumberFound++
                }
              }
            }
            return(countryF)
          }),
        )
      )
    }

    /* ------ This function get a country name and return the DETAIL for this country only ------ */
    getCountryFilteredByName(NameL: string) : Observable<any[]>
    {
      return (this.getCountry().pipe(
          map((country : any[]) =>
          {
            let countryF : any[] = []
            let NumberFound: number = 0
            for(let i=0;i<country.length;i++)
            {
              if(country[i].name == NameL)
              {
                countryF[NumberFound]=country[i]
                NumberFound++
              }
            }
            return(countryF)
          }),
        )
      )
    }

    /* ------ This function take multiple arguments from the HOME -> Advanced Search and return all countries linked to this arguments ------ */
    getCountryAdvanced(Name: string, MaxP: any, MinP: any, MaxS: any, MinS: any, Land: any, UN: any, Dependency: any , SubName: any) : Observable<any[]>
    {
      return (this.getCountry().pipe(
        map((country : any[]) =>
        {
            let countryF : any[] = []
            let NumberFound: number = 0
            let correctLetter: number = 0 //Count the number of correct letter with Name
            let theTestL: number = 0//Verify if Land was null at start
            let theTestUN: number = 0 //Verify if UN was null ...
            let theTestD: number = 0 //Verify if Dependancy was null
            let theTestS: number = 0 //Verify if SubName (sub region Name) was null
            //If nothing was given we make it to take every countries possible
            if(MaxP=="")
            {
              MaxP=20000000000 //The country shall be less than 20 milliard inhabitant (all)
            }
            if(MinP=="")
            {
              MinP=0 //The country shall be above 0 inhabitant (all)
            }
            if(MaxS=="")
            {
              MaxS=20000000000 // The country shall be less than 20 milliard km2 (Russia is 17 Million, so all)
            }
            if(MinS=="")
            {
              MinS=0 // The country shall be more than 0 km2 (all)
            }
            for(let i=0;i<country.length;i++)
            {
              //If Land is null then we don't care about the landlocked value so Land = ValueOfAnyCountry.Landlocked (to return all)
              //Same goes for the others...
              if(Land=="Both" || theTestL==1)
              {
                theTestL = 1
                Land = country[i].landlocked
              }
              if(UN == "Both" || theTestUN==1)
              {
                theTestUN = 1
                UN = country[i].unMember
              }
              if(Dependency == "Both" || theTestD==1)
              {
                theTestD = 1
                Dependency = country[i].independent
              }
              if(SubName == "Any" || theTestS==1)
              {
                theTestS = 1
                SubName = country[i].subRegion
              }
              correctLetter = 0 //Reset for each [i]
              if(country[i].name.length>=Name.length)
              {
                for(let y=0;y<=Name.length-1;y++)
                {
                  if(country[i].name[y].toLowerCase() == Name[y].toLowerCase())
                  {
                    correctLetter++
                  }
                }
              }
              //Now we test everything to add a country having all properties given
              if(country[i].population <= MaxP && country[i].population >= MinP && country[i].size >= MinS && country[i].size <= MaxS
                && correctLetter == Name.length && country[i].landlocked == Land && country[i].unMember == UN && country[i].independent == Dependency
                && country[i].subRegion == SubName  )
              {
                  countryF[NumberFound]=country[i]
                  NumberFound++
              }
            }
          return(countryF)
        }),
      ))
    }

}
