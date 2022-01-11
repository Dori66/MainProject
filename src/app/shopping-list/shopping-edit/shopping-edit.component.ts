import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm: NgForm;
  // @ViewChild('nameInput', {static: false  })   nameInputRef :ElementRef;
  // @ViewChild('amountInput', {static: false  })   amountInputRef :ElementRef;

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem : Ingredient;

  constructor(private service: ShoppingListService) { }


  ngOnInit() {
  this.subscription = this.service.startedEditing.subscribe((index: number) => {
    this.editedItemIndex = index;
    this.editMode = true;
    this.editedItem = this.service.getIngredient(index);
    this.slForm.setValue({
      name: this.editedItem.name,
      amount: this.editedItem.amount
    })
  });
  }

  onSubmit(form: NgForm){
      const value = form.value;
      const newIngredient = new Ingredient(value.name, value.amount  )
    if (this.editMode){
      this.service.updateIngredient(this.editedItemIndex , newIngredient)
    }else {
      this.service.addIngredient(newIngredient)
    }
    this.editMode = false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }
  onDelete(){
    this.service.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
