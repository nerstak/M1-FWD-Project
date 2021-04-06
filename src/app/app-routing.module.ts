import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./routes/homepage/homepage.component";
import {ArticlesComponent} from "./routes/articles/articles.component";
import {DetailsResolver} from "./resolver/details.resolver";
import { ParamsResolver } from './resolver/params.resolver';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'category/:category', component: HomepageComponent },
  { path: 'search/:search', component: HomepageComponent },
  { path: 'adv-search/:params', component: HomepageComponent, resolve:{request : ParamsResolver} },
  { path: 'article/:id', component: ArticlesComponent, resolve:{record : DetailsResolver} }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
