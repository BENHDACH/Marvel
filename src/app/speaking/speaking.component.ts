import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-speaking',
  templateUrl: './speaking.component.html',
  styleUrls: ['./speaking.component.css']
})
export class SpeakingComponent implements OnInit {

  country: any[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void
  {
    /* ------ There we get countries speaking the language chosen ------ */
    this.route.paramMap.subscribe(
      (params) =>
      {
        console.log("Voici la langue:",params.get('Language'))
        this.dataService.getCountryFilteredByLanguage(params.get('Language') ?? '').subscribe(
        (data : any[]) =>
        {
          this.country = data
        }
      )}
    )
  }

}
