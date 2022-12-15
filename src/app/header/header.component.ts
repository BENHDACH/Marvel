import { Component, OnInit, OnDestroy,EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  country: any[]  = []

    constructor(private dataService: DataService)
    { }

    ngOnInit(): void {
        this.dataService.getCountry().subscribe(
            (country : any[]) => {
              this.country=country
              console.log("Show the country name :",this.country[0].img)
            }
            )



    }
}

