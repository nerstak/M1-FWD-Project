import { Component, OnInit } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import {Router} from "@angular/router";
import {QueFaire$Request} from "../models/queFaire.interfaces";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  searchVal : string;
  advanced = false;
  catTitle = 'catégory';

  accessibility = [""];
  prix = "";
  typeAcces = "";
  


  constructor(private router : Router) {
    this.searchVal = '';
   }

  ngOnInit(): void {
    
  }

  clickCat(menuItem : string) {
    if(this.advanced)
    {
      this.catTitle = menuItem;
    } else {
      this.router.navigateByUrl('/category/' +encodeURIComponent(menuItem));
    }
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
    this.catTitle = "catégory"
  }

  advSearch() {
    var params : QueFaire$Request = {};
    if(this.searchVal) params.q = this.searchVal;
    if(this.catTitle!= 'catégory') params.category= this.catTitle;
    if(this.accessibility.includes("blind")) params.blind = true;
    if(this.accessibility.includes("deaf")) params.deaf = true;
    if(this.accessibility.includes("pmr")) params.pmr = true;
    if(this.prix) params.price_type = this.prix;
    if(this.typeAcces) params.access_type = this.typeAcces;

    this.router.navigateByUrl('/adv-search/' +encodeURIComponent(JSON.stringify(params)))
  }

  goHome() {
    this.router.navigateByUrl("");
  }

  search() {
    this.router.navigateByUrl('/search/' +encodeURIComponent(this.searchVal))
  }
}
