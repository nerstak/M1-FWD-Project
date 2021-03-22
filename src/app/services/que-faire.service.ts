import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QueFaire$Request, QueFaire$Response} from "../models/queFaire.interfaces";

@Injectable({
  providedIn: 'root'
})
/**
 * Service providing call to QueFaire API
 */
export class QueFaireService {
  url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get attributes of an article
   * @param idArticle recordId of article
   */
  getArticle(idArticle: string) {
    return this.httpClient.get(`${this.url}&q=&refine.recordid=${idArticle}`)
      .toPromise() as any as QueFaire$Response;
  }

  /**
   * Get the most recent articles
   * @param n Number of article to fetch
   */
  getRecentArticles(n: number) {
    return this.httpClient.get(`${this.url}&q=&rows=${n}&sort=updated_at`)
      .toPromise() as any as QueFaire$Response;
  }

  getSearchArticles(p: QueFaire$Request) {
    const searchURL = this.buildSearchURL(p);
    return this.httpClient.get(searchURL)
      .toPromise() as any as QueFaire$Response;
  }

  private buildSearchURL(p: QueFaire$Request): string {
    let searchURL = this.url;

    if(p.q && p.q.length > 0) searchURL += `&q=${p.q}`
    if(p.blind) searchURL += '&refine.blind=1'
    if(p.deaf) searchURL += '&refine.deaf=1'
    if(p.pmr) searchURL += '&refine.pmr=1'
    if(p.category && p.category.length > 0) searchURL += `&refine.category=${p.category}`

    return searchURL;
  }
}
