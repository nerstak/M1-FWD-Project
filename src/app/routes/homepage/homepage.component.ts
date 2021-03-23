import { Component, OnInit } from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";
import {Record} from "../../models/queFaire.interfaces";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  articles: Record[] | null = null;

  constructor(private queFaireService: QueFaireService) {
    // We don't need to deal with the promise return, so we make the warning disappear 😈
    this.loadArticles().then();

    this.perf_testing().then();
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

  // TODO Remove all of that once search is implemented
  /**
   * Testing performances for parsing dates for at most 1200 elements
   */
  async perf_testing() {
    let p = {q: ""};
    let res = await this.queFaireService.getSearchArticles(p);
    let records = res.records;
    for(let r of records) {
      // Parsing of start - end
      setTimeout(this.tmp(r.fields.date_start +  " - " + r.fields.date_end) , 0);
    }
  }

  tmp(s: string) {
    return() => {
      console.log(s);
    };
  }
}
