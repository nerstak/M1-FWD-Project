import { Component, OnInit } from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import Fields, {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {DetailsArticleService} from "../../services/details-article.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  articles: Record[] | null = null;

  constructor(private queFaireService: QueFaireService, private articleService : DetailsArticleService, private router : Router) {
    // We don't need to deal with the promise return, so we make the warning disappear 😈
    this.loadArticles().then();
  }

  /**
   * Test function
   * Load a single article based on its id
   */
  async getArticle() {
    const id = "c83d2ec3ee2c5a1a06cdd81dacb96a747800691e";

    const result = await this.queFaireService.getArticle(id);

    console.log(result.records[0].fields.description);
  }

  /**
   * Load articles
   */
  async loadArticles() {
    try {
      const result = await this.queFaireService.getRecentArticles(11);
      if (result.records.length > 0) {
        this.articles = result.records;
      }
    } catch (err) {
      if (err instanceof HttpErrorResponse) {
        this.articles = null;
      } else {
        throw err;
      }
    }
  }

  /**
   * OnClickCardEvent
   * */
  onClickCard(field : Fields){
    this.articleService.setDetailedArticle(field);
    this.router.navigateByUrl('/article')
  }
}
