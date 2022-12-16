import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TmplAstBoundAttribute } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class
DataService {

    protected Country: any[] = []
    constructor(private httpClient: HttpClient) { }

    getCountry(): Observable<any[]> {

       return(this.httpClient.get<any[]>('https://restcountries.com/v3.1/all').pipe(
        map((tab: any[]) => {
          const newArray: any[] = []
          let LanguageA: any[] = []
          for(let i=0; i < tab.length;i++) {
            //There is a country which is a continent, so he don't have language or flag, so we jump it with a if.
              if(tab[i]['name']['common']!='Antarctica'){
                let newElem = {
                  name : tab[i]['name']['common'],
                  img : tab[i]['flags']['png'],
                  region : tab[i]['continents'],
                  language : tab[i]['languages'],
                  size : tab[i]['area'],
                  population : tab[i]['population'],
                }
                newArray.push(newElem)
              }
          }
          return(newArray)
        },
        )
      )
      )
        //return this.cocktails
    }

    getRegion(): Observable<any[]> {

      return(this.getCountry().pipe(
        map((country : any[]) => {
          const countryR : any[] = country
          const regionArray: any[] = []
          let doyouAdd: boolean = true
          //We search each region
          for(let i=0;i<countryR.length;i++)
          {
            doyouAdd = true //Reset the value of DoYouAdd if it changed inside the 2nd for
            //We compare each gained region
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



    getLanguage(): Observable<any[]> {

      return(this.getCountry().pipe(
        map((country : any[]) => {
          const countryR : any[] = country
          const languageArray: any[] = []
          let doyouAdd: boolean = true
          //We search each region
          for(let i=0;i<countryR.length;i++)
          {


            doyouAdd = true //Reset the value of DoYouAdd if it changed inside the 2nd for
            //We compare each gained region
            //console.log(Object.entries(countryR[i].language).length)
            for(let j=0;j<languageArray.length;j++)
            {//
              if(languageArray[j]==(Object.entries(countryR[i].language)[0][1]))
              {
                //If the region is already writen then no need to add it
                doyouAdd = false
              }
            }
            if(doyouAdd == true)
            {

              languageArray.push(Object.entries(countryR[i].language)[0][1])
            }

          }
          //At the end we also want the number of user so lets do it there instead of calling this again
          const languageArrayFinal : any[] = []

          for (let z=0;z<languageArray.length;z++){
            //There is at least One country who speak a language in .language
            let iteration: number = 1
            //we need to see every country not juste the 72 language
            for(let y=0; y<countryR.length; y++){
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

}
