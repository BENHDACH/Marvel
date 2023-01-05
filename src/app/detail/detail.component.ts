import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  country: any[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      (params) => {
        console.log("Voici la region:",params.get('Name'))
        this.dataService.getCountryFilteredByName(params.get('Name') ?? '').subscribe(
        (data : any[]) => {
          this.country = data
        }
      )}
    )
  }
}
