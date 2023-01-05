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

  ngOnInit(): void
  {
    /* ------ There we get an array of all languages which are being spoken (official language) ------ */
    this.dataService.getLanguage().subscribe(
      (data : any[]) =>
      {
        this.Language = data
      })
  }
  /* ------ We show information hidden if wanted by the client ------ */
  ShowNumber(): void
  {
    this.isHidden=!this.isHidden
  }

}
