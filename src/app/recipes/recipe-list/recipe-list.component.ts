import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes : Recipe [] = [
    new Recipe('A Test Recipe','A Test','https://www.acouplecooks.com/wp-content/uploads/2020/05/Grilled-Sweet-Potatoes-009.jpg'),
    new Recipe('Second Test','A Test','https://www.acouplecooks.com/wp-content/uploads/2020/05/Grilled-Sweet-Potatoes-009.jpg')
  ];

  @Output() recipeWasSelected = new EventEmitter<Recipe>();


  constructor() { }

  ngOnInit(): void {
  }
  onRecipeSelected(recipe: Recipe){
    this.recipeWasSelected.emit(recipe);
  }

}
