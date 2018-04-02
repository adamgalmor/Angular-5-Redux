import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from "./data/data.component";
import { HomepageComponent } from "./homepage/homepage.component";

const routes: Routes = [
  {
    path: '',
    component: HomepageComponent
  },
  {
    path: 'data',
    component: DataComponent
  },
  {
    path: 't',
    redirectTo: 'todos',
    pathMatch: 'full'
//  prefix: default, matches when the URL starts with the value of path
//  full: matches when the URL equals the value of path.
  }
  // },
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
export const routingComponents = [HomepageComponent, DataComponent]
