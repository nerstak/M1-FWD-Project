import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  searchVal : string;
  constructor(private router : Router) {
    this.searchVal = '';
   }

  ngOnInit(): void {

  }

  clickCat(menuItem : string) {
    this.router.navigateByUrl('/category/' +encodeURIComponent(menuItem))
  }

  goHome() {
    this.router.navigateByUrl("");
  }

  search() {
    this.router.navigateByUrl('/search/' +encodeURIComponent(this.searchVal))
  }
}
