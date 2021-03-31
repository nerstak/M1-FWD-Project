import { Component, OnInit } from '@angular/core';
import {DetailsArticleService} from "../../services/details-article.service";
import Fields from "../../models/queFaire.interfaces";
import Record from "../../models/queFaire.interfaces";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  detailedArticleToDisplay : Fields | null | undefined;


  constructor(private detailArticleService : DetailsArticleService, private route : ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.data.record.fields)
    this.detailedArticleToDisplay = this.route.snapshot.data.record.fields;
  }

}
