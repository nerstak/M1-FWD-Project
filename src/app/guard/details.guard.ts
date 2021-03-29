import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {DetailsArticleService} from "../services/details-article.service";

@Injectable({
  providedIn: 'root'
})
export class DetailsGuard implements CanActivate {
  constructor(private detailsArticleService: DetailsArticleService, private router : Router) {
  }

  canActivate(){
    if(this.detailsArticleService.getDetailedArticle()) return true;
    return this.router.parseUrl('/')
  }

}
