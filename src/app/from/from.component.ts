import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-from',
  templateUrl: './from.component.html',
  styleUrls: ['./from.component.css']
})
export class FromComponent implements OnInit {
  country: any[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void
  {
    /* ------ There we get countries from the region chosen ------ */
    this.route.paramMap.subscribe(
      (params) =>
      {
        console.log("Voici la region:",params.get('Region'))
        this.dataService.getCountryFilteredByRegion(params.get('Region') ?? '').subscribe(
        (data : any[]) => {
          this.country = data
        }
      )}
    )
  }

}
