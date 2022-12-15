import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TmplAstBoundAttribute } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class
DataService {

    protected cocktails = []
    constructor(private httpClient: HttpClient) { }

    getCountry(): Observable<any[]> {

       return(this.httpClient.get<any[]>('https://restcountries.com/v3.1/all').pipe(
        map((tab: any[]) => {
            const newArray: any[] = []
            for(let i=0; i < tab.length;i++) {
                let newElem = {
                    name : tab[i]['name']['common'],
                    img : tab[i]['flags']['png']
                }
                newArray.push(newElem)
            }
            return(newArray)
        }
        )
      )
      )
        //return this.cocktails
    }

}
