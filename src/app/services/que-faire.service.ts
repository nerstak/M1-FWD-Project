import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {QueFaire$Request, QueFaire$Response, Record} from "../models/queFaire.interfaces";
import {sameDay} from "../utils/Date";

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
    params = params.append('refine.recordid',`${idArticle}`);

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
    params = params.append('rows',`${n}`);
    params = params.append('sort', 'updated_at');
    params = params.append('start', `${i}`);

    return this.httpClient.get(this.url, { params: params })
      .toPromise() as any as QueFaire$Response;
  }

  async getSearchArticles(p: QueFaire$Request) {
    let records = [];
    let res = await this.requestSearchArticles(p);
    let firstRecords = res.records;

    // Searching with date
    if(p.date) {
      for (let r of firstRecords) {
        if (p.date > new Date(r.fields.date_start) && p.date <= new Date(r.fields.date_end)) {

          let dates = r.fields.occurrences.split(";");
          for (let d of dates) {
            let values = d.split("_");
            let dt = {start: new Date(values[0]), end: new Date(values[1])};
            if (sameDay(p.date, dt.start)) {
              records.push(r);
            }
          }
        }
      }
      return records;
    } else {
      // If no need to perform date search
      return firstRecords;
    }

  }

  /**
   * Request articles using search parameters
   * @param p Parameters
   */
  requestSearchArticles(p: QueFaire$Request) {
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

    params = params.append('rows','1200');

    // Building non conventional parameters (no simple method for all)
    if(p.q && p.q.length > 0) params = params.append('q',p.q);
    if(p.blind) params = params.append('refine.blind','1');
    if(p.deaf) params = params.append('refine.deaf','1')
    if(p.pmr) params = params.append('refine.pmr','1')

    // Building other parameters
    if(p.category) params = params.append('refine.category',p.category);
    if(p.access_type) params = params.append('refine.access_type',p.access_type);
    if(p.price_type) params = params.append('refine.price_type',p.price_type);
    if(p.address_city) params = params.append('refine.address_city',p.address_city);
    if(p.address_zipcode) params = params.append('refine.address_zipcode',p.address_zipcode);

    return params;
  }
}
