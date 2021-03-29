import {Component, ViewEncapsulation} from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import Fields, {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {DetailsArticleService} from "../../services/details-article.service";
import {Router} from "@angular/router";
import {sameDay} from "../../utils/Date";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageComponent {
  articles: Record[] | null = null;

  constructor(private queFaireService: QueFaireService, private articleService : DetailsArticleService, private router : Router) {
    // We don't need to deal with the promise return, so we make the warning disappear 😈
    this.loadArticles();

    this.perf_testing().then();
  }


  /**
   * Load articles
   */
  loadArticles() {
    try {
      this.queFaireService.getRecentArticles(11).then(articles => this.articles = articles);
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

  // TODO Remove all of that once search is implemented
  /**
   * Testing performances for parsing dates for at most 1200 elements
   */
  async perf_testing() {
    let p = {q: "", tags: ['Ados','Bibliothèques'], category: "Expositions "};
    let res = await this.queFaireService.getSearchArticles(p);
    console.log(res);
  }
}
