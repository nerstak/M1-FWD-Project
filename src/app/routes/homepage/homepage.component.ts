import { Component, OnInit } from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";
import {sameDay} from "../../utils/Date";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  articles: Record[] | null = null;

  constructor(private queFaireService: QueFaireService) {
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

  // TODO Remove all of that once search is implemented
  /**
   * Testing performances for parsing dates for at most 1200 elements
   */
  async perf_testing() {
    let p = {q: "", tags: ['Ados','Bibliothèques']};
    let res = await this.queFaireService.getSearchArticles(p);
    console.log(res);
  }
}
