import {Component, Input, OnInit} from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import {DetailsArticleService} from "../../services/details-article.service";
import {Router} from "@angular/router";
import Fields, {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {faCircleNotch, fas, faSpinner, faSignOutAlt, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit {
  articles: Record[] | null = null;
  error = false;

  @Input()
  category = "";

  faCircleNotch = faCircleNotch
  faWarning = faExclamationTriangle


  constructor(private queFaireService: QueFaireService, private articleService : DetailsArticleService, private router : Router) {
  }

  ngOnInit(): void {
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
      this.queFaireService.getRecentArticles(11 + additional, startingRow, this.category).then(articles => {
          if (!this.articles) {
            this.articles = articles;
          } else {
            this.articles.push.apply(this.articles, articles);
          }
        }
      );
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
