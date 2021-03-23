import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
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
    let params = new HttpParams();
    params.append('refine.recordid',`${idArticle}`);

    return this.httpClient.get(this.url, {params: params})
      .toPromise() as any as QueFaire$Response;
  }

  /**
   * Get the most recent articles
   * @param n Number of article to fetch
   * @param i Start index
   */
  getRecentArticles(n: number, i = 0) {
    let params = new HttpParams();
    params.append('rows',`${n}`);
    params.append('sort', 'updated_at');
    params.append('start', `${i}`);

    return this.httpClient.get(this.url, { params: params })
      .toPromise() as any as QueFaire$Response;
  }

  /**
   * Get articles using search parameters
   * @param p Parameters
   */
  getSearchArticles(p: QueFaire$Request) {
    const params = this.buildParamsSearch(p);
    return this.httpClient.get(this.url, {params : params})
      .toPromise() as any as QueFaire$Response;
  }

  /**
   * Build the url to query from parameters
   * Note that in order to limit CPU usage, you should use setTimeout on results
   * @param p Parameters
   */
  private buildParamsSearch(p: QueFaire$Request): HttpParams {
    let params = new HttpParams();

    params.append('rows','1200');

    // Building non conventional parameters (no simple method for all)
    if(p.q && p.q.length > 0) params.append('q',p.q);
    if(p.blind) params.append('refine.blind','1');
    if(p.deaf) params.append('refine.deaf','1')
    if(p.pmr) params.append('refine.pmr','1')

    // Building other parameters
    if(p.category) params.append('refine.category',p.category);
    if(p.access_type) params.append('refine.access_type',p.access_type);
    if(p.price_type) params.append('refine.price_type',p.price_type);
    if(p.address_city) params.append('refine.address_city',p.address_city);
    if(p.address_zipcode) params.append('refine.address_zipcode',p.address_zipcode);


    console.log(params);
    return params;
  }
}
