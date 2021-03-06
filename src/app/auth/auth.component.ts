import {Component, ComponentFactoryResolver, OnDestroy, ViewChild} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})

export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  private closeSub: Subscription;



constructor(private authService: AuthService, private router: Router) {
}

  onSwitchMOde(){
    this.isLoginMode = !this.isLoginMode ;
  }



  onSubmit(authForm : NgForm){
    if (!authForm.valid){
      return;
    }
      const email = authForm.value.email;
      const password = authForm.value.password

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;

    if (this.isLoginMode){
       authObs =  this.authService.login(email,password);
    }else {
    authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes'])
      },
      errorMessage => {
        console.log(errorMessage);
        this.error = errorMessage
        this.isLoading = false;
      });
    authForm.reset();
  }




  onHandleError(){
  this.error = null;
  }


  // private showErrorAlert(mesasge: string){
  //   const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
  //
  //   const hostViewContainerRef = this.alertHost.viewContainerRef;
  //   hostViewContainerRef.clear();
  //
  //    const componentRef =   hostViewContainerRef.createComponent(alertCmpFactory)
  //
  //
  //   componentRef.instance.message = mesasge;
  //   this.closeSub =componentRef.instance.close.subscribe(() => {
  //       this.closeSub.unsubscribe();
  //       hostViewContainerRef.clear();
  //   });
  // };




}
