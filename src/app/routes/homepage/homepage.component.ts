import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import Fields, {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {DetailsArticleService} from "../../services/details-article.service";
import {ActivatedRoute, Router} from "@angular/router";
import {sameDay} from "../../utils/Date";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent implements OnInit{
  // Title is displayed on page
  title = "Homepage"
  // Category is given to articles list
  category = "";

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const cat = this.route.snapshot.paramMap.get("category");

    if(cat) {
      this.category = cat;
      this.title = this.category;
    }
  }
}
