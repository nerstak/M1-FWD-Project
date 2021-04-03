import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import {DetailsArticleService} from "../../services/details-article.service";
import {Router} from "@angular/router";
import Fields, {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {faCircleNotch, faExclamationTriangle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css']
})
export class ArticlesListComponent implements OnInit, OnChanges {
  articles: Record[] | null = null;
  error = false;

  @Input()
  input = "";

  category="";
  search="";

  faCircleNotch = faCircleNotch
  faWarning = faExclamationTriangle

  constructor(private queFaireService: QueFaireService, private articleService : DetailsArticleService, private router : Router) {
  }

  ngOnInit(): void {
    this.getInput();
    this.loadArticles();
    setTimeout(this.errorMessage(), 10000);
  }

  //If we go from one category to another, clear articles reset error timer and load new articles.
  ngOnChanges() {
    this.getInput();
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
      this.queFaireService.getRecentArticles(11 + additional, startingRow, this.category, this.search).then(articles => {
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

  getInput() {
    if(this.input){
      var splitInput = this.input.split(':');
      if(splitInput[0] == "cat") {
        this.category = splitInput[1];
      } else if (splitInput[0] == "search") {
        this.search = splitInput[1];
      }
    }
  }
}
