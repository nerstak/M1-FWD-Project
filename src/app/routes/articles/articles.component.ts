import { Component, OnInit } from '@angular/core';
import {DetailsArticleService} from "../../services/details-article.service";
import Fields from "../../models/queFaire.interfaces";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  detailedArticleToDisplay : Fields | null | undefined;


  constructor(private detailArticleService : DetailsArticleService) { }

  ngOnInit(): void {
    this.detailedArticleToDisplay = this.detailArticleService.getDetailedArticle();
  }

}
