import { Component, OnInit } from '@angular/core';
import {QueFaireService} from "../../services/que-faire.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private queFaireService: QueFaireService) { }

  async getArticle() {
    const id = "c83d2ec3ee2c5a1a06cdd81dacb96a747800691e";

    const result = await this.queFaireService.getArticle(id);

    console.log(result.records[0].fields.description);
  }

}
