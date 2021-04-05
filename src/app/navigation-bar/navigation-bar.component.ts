import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import {Router} from "@angular/router";
import {QueFaire$Request} from "../models/queFaire.interfaces";

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  advanced = false;

  //Search variables
  searchVal : string = '';
  catTitle = 'Catégories';
  accessibility : string[] = [];
  prix = "";
  typeAcces = "";
  codePostal = 0;
  tags : string[] = [];
  date : string = "";


  listArondissements : number[] = [];
  listTags: string[] = [];

  constructor(private router : Router) {
   }

  ngOnInit(): void {
    for (var i = 1; i< 21; i++) {
      this.listArondissements.push(i);
    }
    this.listTags = ["Ados","Bibliothèques","Cinéma","En famille","Enfants","Étudiants","Expos","Geek","Gourmand","Insolite","Les Nuits","Musique"
                  ,"Noël","Nuit Blanche","Plein air","Queer Lgbt","Solidaire","Sport","Urbain","Végétalisons Paris"];
  }

  /**
   * Refines search by clicked category
   * @param menuItem Chosen category
   */
  clickCat(menuItem : string) {
    if(this.advanced)
    {
      //Simply save category for now
      this.catTitle = menuItem;
    } else {
      //Direct to search
      this.router.navigateByUrl('/category/' +encodeURIComponent(menuItem));
    }
  }

  /**
   * Toggles between advanced and basic search
   */
  toggleAdvanced() {
    this.advanced = !this.advanced;
    this.catTitle = "Catégories"
  }

  /**
   * Starts an advanced search by constructing a Request with the params chosen
   */
  advSearch() {
    var params : QueFaire$Request = {};
    if(this.searchVal) params.q = this.searchVal;
    if(this.catTitle!= 'Catégories') params.category= this.catTitle;
    if(this.accessibility.includes("blind")) params.blind = true;
    if(this.accessibility.includes("deaf")) params.deaf = true;
    if(this.accessibility.includes("pmr")) params.pmr = true;
    if(this.prix) params.price_type = this.prix;
    if(this.typeAcces) params.access_type = this.typeAcces;
    if(this.codePostal) params.address_zipcode = this.codePostal.toString();
    if(this.tags.length) params.tags = this.tags;
    if(this.date) {
      params.date = new Date(this.date);
      params.date.setHours(14);
    }

    //Turns the JSON object into a string and send it in the url
    this.router.navigateByUrl('/adv-search/' +encodeURIComponent(JSON.stringify(params)))
  }

  /**
   * Direct to main homepage on button click
   */
  goHome() {
    this.router.navigateByUrl("");
  }

  /**
   * Search usingg simply the entered term
   */
  search() {
    this.router.navigateByUrl('/search/' +encodeURIComponent(this.searchVal))
  }
}
