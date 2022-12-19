import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  Currency: any[] = []
  isHidden: boolean = true;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getCurrency().subscribe(
      (data : any[]) => {
        this.Currency = data
        console.log("Oupa:",this.Currency[0][1])
      }

    )
  }
  ShowNumber(): void{
    this.isHidden=!this.isHidden
  }
}
