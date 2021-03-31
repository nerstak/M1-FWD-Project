import { Injectable } from '@angular/core';
import Fields from "../models/queFaire.interfaces";

@Injectable({
  providedIn: 'root'
})
export class DetailsArticleService {

  private detailedArticle: Fields | null | undefined;

  constructor() { }

  setDetailedArticle(field : Fields){
    this.detailedArticle = field
  };

  getDetailedArticle(){
    return this.detailedArticle;
  }

}
