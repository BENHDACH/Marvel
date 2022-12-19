import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.component.html',
  styleUrls: ['./regions.component.css']
})
export class RegionsComponent implements OnInit {
  Region: any[] = []
  constructor(private dataService: DataService) { }

  ngOnInit(): void
  {
    /* ------ There we get an array of all regions existing ------ */
    this.dataService.getRegion().subscribe(
      (data : any[]) => this.Region = data
    )
  }



}
