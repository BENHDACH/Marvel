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

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => this.country = this.dataService.getCountryFilteredByRegion(params.get('region') ?? '')
  )
  }

}
