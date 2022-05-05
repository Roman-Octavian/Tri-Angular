import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  title: string = 'tri-angular';

  dynamic: boolean = true;
  
  highlight: number = 0;

  onClick(): void {
    if (this.highlight === 0) {
      this.highlight = 1;
    } else if (this.highlight === 1) {
      this.highlight = 2;
    } else {
      this.highlight = 0;
    }
  }

  openInfo() {
    window.alert("Press the logo to toggle highlight color.\nDrag the triangle by its vertices to perform calculations.");
  }

  constructor() { }

  ngOnInit(): void {}

}