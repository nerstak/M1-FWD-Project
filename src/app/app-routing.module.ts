import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./routes/homepage/homepage.component";
import {ArticlesComponent} from "./routes/articles/articles.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'article', component: ArticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
