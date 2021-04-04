import { Component, OnInit } from '@angular/core';
import {DetailsArticleService} from "../../services/details-article.service";
import Fields from "../../models/queFaire.interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  detailedArticleToDisplay : Fields | null | undefined;
  accessibility? : boolean;

  constructor(private detailArticleService : DetailsArticleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.data.record.fields);
    this.detailedArticleToDisplay = this.route.snapshot.data.record.fields;
    this.accessibility = (this.detailedArticleToDisplay?.deaf === 1) || (this.detailedArticleToDisplay?.pmr === 1) || (this.detailedArticleToDisplay?.blind === 1);
    console.log((this.detailedArticleToDisplay?.deaf === 1) || (this.detailedArticleToDisplay?.pmr === 1) || (this.detailedArticleToDisplay?.blind === 1));
    console.log(this.detailedArticleToDisplay?.deaf === 1)
    console.log(this.detailedArticleToDisplay?.blind === 1)
    console.log(this.detailedArticleToDisplay?.pmr === 1)
  }

}
