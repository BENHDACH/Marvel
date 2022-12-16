import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.css']
})
export class LanguagesComponent implements OnInit {
  Language: any[] = []
  isHidden: boolean = true;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getLanguage().subscribe(
      (data : any[]) => {
        this.Language = data
        console.log("Try this out:",this.Language[0][1])
      }

    )
  }
  ShowNumber(): void{
    this.isHidden=!this.isHidden
  }

}
