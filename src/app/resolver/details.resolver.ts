import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
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
    const userId = <string>route.paramMap.get('id');
    console.log("id" + userId);
    return this.articleService.getArticle(userId) as any;
  }
}
