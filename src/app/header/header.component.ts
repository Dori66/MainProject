import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  ngOnDestroy(){
    this.userSub.unsubscribe();
  }

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataService: DataStorageService, private authServive: AuthService) { }


  onSaveData(){
    this.dataService.storeRecipes();
  }


  onFetchData(){
    this.dataService.fetchRecipes().subscribe();
  }

  ngOnInit(): void {
    this.userSub = this.authServive.user.subscribe(user => {
    this.isAuthenticated = !user ? false : true;
    console.log(!user)
    });
  }

  onLogout(){
    this.authServive.logout();
  }
}
