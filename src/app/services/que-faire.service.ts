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
   * Build inline parameter for refine ones
   * @param name Name of parameter
   * @param s Parameter variable
   */
  private static buildParamRefine(name: string, s: string | undefined) {
    if(s && s.length > 0) return `&refine.${name}=${s}`
    return "";
  }

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

  /**
   * Get articles using search parameters
   * @param p Parameters
   */
  getSearchArticles(p: QueFaire$Request) {
    const searchURL = this.buildSearchURL(p);
    return this.httpClient.get(searchURL)
      .toPromise() as any as QueFaire$Response;
  }

  /**
   * Build the url to query from parameters
   * @param p Parameters
   */
  private buildSearchURL(p: QueFaire$Request): string {
    let searchURL = this.url;

    // Building non conventional parameters (no simple method for all)
    if(p.q && p.q.length > 0) searchURL += `&q=${p.q}`
    if(p.blind) searchURL += '&refine.blind=1'
    if(p.deaf) searchURL += '&refine.deaf=1'
    if(p.pmr) searchURL += '&refine.pmr=1'

    // Building other parameters
    searchURL += QueFaireService.buildParamRefine('category', p.category);
    searchURL += QueFaireService.buildParamRefine('access_type', p.access_type);
    searchURL += QueFaireService.buildParamRefine('price_type', p.price_type);
    searchURL += QueFaireService.buildParamRefine('address_city', p.address_city);
    searchURL += QueFaireService.buildParamRefine('address_zipcode', p.address_zipcode);

    searchURL += '&rows=1200';

    console.log(searchURL);
    return searchURL;
  }


}
