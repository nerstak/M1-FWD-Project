import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(private router : Router) {
   }

  ngOnInit(): void {
  }

  clickCat(menuItem : String){
    this.router.navigateByUrl('/category/' + this.parseUrl(menuItem))
  }

  parseUrl(inUrl : String): String {
    inUrl = inUrl.split(' ').join('%20');
    return inUrl.split('/').join('_');
  }
}
