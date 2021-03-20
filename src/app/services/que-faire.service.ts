import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {QueFaire$Response} from "../models/queFaire.interfaces";

@Injectable({
  providedIn: 'root'
})
export class QueFaireService {
  url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=que-faire-a-paris-";

  constructor(private httpClient: HttpClient) { }

  getArticle(idArticle: string) {
    return this.httpClient.get(`${this.url}&q=&refine.recordid=${idArticle}`)
      .toPromise() as any as QueFaire$Response;
  }
}
