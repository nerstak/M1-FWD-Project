import {Component, ViewEncapsulation} from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import Fields, {Record, QueFaire$Request} from "../../models/queFaire.interfaces";
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
export class HomepageComponent {
  // Title is displayed on page
  title = "Homepage"
  // Category is given to articles list
  category = "";
  search = "";

  //output is sent to app-articles-list
  output: QueFaire$Request;

  constructor(private route: ActivatedRoute) {
    this.output= {};

    // Subscribe to changes in route parameters so we dont have to init the whole page every time
    route.params.subscribe(val => {
      // Value of category if we are refining by category
      const cat = this.route.snapshot.paramMap.get("category");
      // Search term if we are searching with a query
      const query = this.route.snapshot.paramMap.get("search");
      // All search terms if we are doing an advanced search
      const params = this.route.snapshot.data.request;

      if(params) {
        this.output = params;
        this.title = "Advanced search results:";
      } else if(cat) {
        this.title = cat;
        this.output= {
          category : cat
        };
      } else if(query) {
        this.title = 'Results matching "' + query + '":';
        this.output = {
          q : query
        };
      }
    });
  }
}
