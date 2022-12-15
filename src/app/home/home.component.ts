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
  numbers: any[] = []
  constructor(private dataService: DataService){
    this.numbers = [0,1,2,3,4]
  }

  ngOnInit(): void {
    this.dataService.getCountry().subscribe(
        (country : any[]) => {
          this.country=country
          console.log("Show the country name :",this.country[0].img)
        }
    )
  }

}
