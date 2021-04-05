import {Component, Input, OnChanges} from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import {DetailsArticleService} from "../../services/details-article.service";
import {Router} from "@angular/router";
import Fields, {Record, QueFaire$Request} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {faCircleNotch, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements  OnChanges {
  articles: Record[] | null = null;
  error = false;

  @Input()
  input : QueFaire$Request;

  faCircleNotch = faCircleNotch
  faWarning = faExclamationTriangle

  constructor(private queFaireService: QueFaireService, private articleService : DetailsArticleService, private router : Router) {
    this.input = {};
  }

  //If we go from one category to another, clear articles reset error timer and load new articles.
  ngOnChanges() {
    this.articles= null;
    this.error = false;
    this.loadArticles();
    setTimeout(this.errorMessage(), 10000);
  } 

  /**
   * Load articles at startup and for infinite loading
   */
  loadArticles() {
    try {
      // Starting row for fetching
      const startingRow = this.articles ? this.articles.length : 0;
      // We only want an odd number of articles in the page
      const additional = startingRow != 0 && startingRow % 2 == 1 ? 1 : 0;
      this.input.category;
      //If we are searching by date, we need to load all results before filtering them by date.
      if (this.input.date) {
        this.queFaireService.getSearchArticles(this.input).then(articles => {
            if (!this.articles) {
              this.articles = articles;
            } else {
              this.articles.push.apply(this.articles, articles);
            }
          }
        );
      } else {
        //If we aren't searching by date, we can simply request n articles sorted by most recently updated
        this.queFaireService.getRecentArticles(11 + additional, startingRow, this.input).then(articles => {
            if (!this.articles) {
              this.articles = articles;
            } else {
              this.articles.push.apply(this.articles, articles);
            }
          }
        );
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

  errorMessage() {
    return () => {
      if(this.articles == null || this.articles.length == 0) this.error = true;
    }
  }
}
