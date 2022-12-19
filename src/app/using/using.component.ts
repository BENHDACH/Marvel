import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-using',
  templateUrl: './using.component.html',
  styleUrls: ['./using.component.css']
})
export class UsingComponent implements OnInit {

  country: any[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void
  {
    /* ------ There we get countries using the currency chosen ------ */
    this.route.paramMap.subscribe(
      (params) =>
      {
        this.dataService.getCountryFilteredByCurrency(params.get('currency') ?? '').subscribe(
        (data : any[]) =>
        {
          this.country = data
        }
      )}
    )
  }

}
