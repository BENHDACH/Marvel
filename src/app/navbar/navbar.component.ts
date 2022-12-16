import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavBarComponent implements OnInit {

    letters = new Array<string>()

    constructor(private router: Router) { }

    ngOnInit(): void {
        for(let i=0; i<26; i++) {
            this.letters.push(String.fromCharCode(i+65))
        }
    }

    all() {
        this.router.navigate(['/home', ''])
    }

}
