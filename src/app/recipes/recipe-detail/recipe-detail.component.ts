 import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
 import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(private recipeservice: RecipeService, private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeservice.getRecipe(this.id);
    this.route.params.subscribe((params:Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeservice.getRecipe(this.id);
    });
  }

  onAddtoShoppingList(){
    this.recipeservice.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe(){
    this.router.navigate(['edit'],{relativeTo:this.route})
  }

}
