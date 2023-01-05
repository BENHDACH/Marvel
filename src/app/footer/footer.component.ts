import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  Path: string = 'assets/Footer.png'
  WidthScreen: number = screen.width
  constructor() { }

  ngOnInit(): void {
  }

}
