import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Record } from "../models/queFaire.interfaces";
import { QueFaireService } from "../services/que-faire.service";

@Injectable({
  providedIn: 'root'
})
export class DetailsResolver implements Resolve<Record> {
  constructor(private articleService : QueFaireService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Record> {
    //Get the id in the url parameter
    const userId = <string>route.paramMap.get('id');
    //Get the article from the API
    return this.articleService.getArticle(userId) as any;
  }
}
