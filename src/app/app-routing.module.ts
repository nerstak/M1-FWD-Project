import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./routes/homepage/homepage.component";
import {ArticlesComponent} from "./routes/articles/articles.component";
import {DetailsGuard} from "./guard/details.guard";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'category/:category', component: HomepageComponent },
  { path: 'article', component: ArticlesComponent, canActivate: [DetailsGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
