import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping.service";
import { Recipe } from "./recipe.model";
import {Subject} from "rxjs";

@Injectable()

export class RecipeService {

 recipesChanged = new Subject<Recipe[]>();

 // private  recipes : Recipe [] = [
 //    new Recipe('Main Meal','Mixed Potatos','https://www.acouplecooks.com/wp-content/uploads/2020/05/Grilled-Sweet-Potatoes-009.jpg',
 //                        [
 //                          new Ingredient('Meat',1),
 //                          new Ingredient('French Fries',10)
 //                        ]),
 //    new Recipe('OctoberFest Burger','Route 66','https://pbs.twimg.com/media/DxMGelcXQAAKU5T.jpg',
 //            [
 //              new Ingredient('Buns',2),
 //              new Ingredient('Meat',1)
 //            ])
 //  ];

  private recipes : Recipe [] = [];

  constructor(private slServer: ShoppingListService){

  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }


  getRecipes(){
    return this.recipes.slice();
  }

  getRecipe(index: number){
      return  this.recipes[index];
  }


  addIngredientsToShoppingList(ingredients: Ingredient[]){
      this.slServer.addIngredients(ingredients);
  }


  addRecipe(recipe: Recipe){
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice())

  }

  deleteRecipe(index : number){
    this.recipes.splice(index,1)
    this.recipesChanged.next(this.recipes.slice());
  }

}
