import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {

recipeSelected = new EventEmitter<Recipe>();

 private  recipes : Recipe [] = [
    new Recipe('A Test Recipe','A Test','https://www.acouplecooks.com/wp-content/uploads/2020/05/Grilled-Sweet-Potatoes-009.jpg',
                        [
                          new Ingredient('Meat',1),
                          new Ingredient('French Fries',10)
                        ]),
    new Recipe('Second Test','A Test','https://www.acouplecooks.com/wp-content/uploads/2020/05/Grilled-Sweet-Potatoes-009.jpg',
            [
              new Ingredient('Buns',2),
              new Ingredient('Meat',1)
            ])
  ];

  constructor(private slServer: ShoppingListService){

  }

  getRecipes(){
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.slServer.addIngredients(ingredients);
  }


}