import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients :  Ingredient [];
  private igChangeSub:Subscription;

  constructor(private service: ShoppingListService) {
    // this.service = new ShoppingListService()
  }

  ngOnInit(): void {
    this.ingredients = this.service.getIngredients();
   this.igChangeSub  = this.service.ingredientsChanged.subscribe((ingredients : Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditItem(index: number){
    this.service.startedEditing.next(index);
  }

  ngOnDestroy(){
    this.igChangeSub.unsubscribe();
  }
}
