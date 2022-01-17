import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const approutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full'},
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

