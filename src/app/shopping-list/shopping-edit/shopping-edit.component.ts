import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static: false  })   nameInputRef :ElementRef;
  @ViewChild('amountInput', {static: false  })   amountInputRef :ElementRef;

  constructor(private service: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(){
      const ignName = this.nameInputRef.nativeElement.value;
      const ignAmount = this.amountInputRef.nativeElement.value;
      const newIngredient = new Ingredient(ignName,ignAmount);
      this.service.addIngredient(newIngredient)
  }
}
