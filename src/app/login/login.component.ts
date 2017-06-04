import {Component, OnInit} from '@angular/core';
import {AuthService} from "../providers/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  template: `<div class="container">
  <div class="card card-container">
    <form #f="ngForm" [formGroup]="loginForm" (ngSubmit)="submitted()">

      <div [hidden]="!message" class="alert alert-danger" role="alert">
        {{message}}
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="text" formControlName="email" class="form-control" id="exampleInputEmail1"
               aria-describedby="emailHelp"
               placeholder="Enter email">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        <div *ngIf="loginForm.get('email').invalid  && f.submitted">
          <small *ngIf="loginForm.get('email').hasError('required')" class="form-text text-danger">Email is required
          </small>
          <small *ngIf="loginForm.get('email').hasError('email')" class="form-text text-danger">Not a valid email
          </small>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" formControlName="password" class="form-control" id="exampleInputPassword1"
               placeholder="Password">
        <div *ngIf="loginForm.get('password').invalid  && f.submitted">
          <small *ngIf="loginForm.get('password').hasError('required')" class="form-text text-danger">Password is
            required
          </small>
        </div>
      </div>
      <button type="submit" class="btn btn-primary btn-block">Submit</button>
    </form>
    <br>
    
    <div class="progress" *ngIf="loading">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100"
           aria-valuemin="0" aria-valuemax="100" style="width: 100%; height: 5px;"></div>
    </div>
  </div>
</div>
  `,
  styles: [`
     
.card-container.card {
    max-width: 375px;
    padding: 40px 40px;
}
  
.card {
    background-color: #F7F7F7;
    padding: 20px 25px 30px;
    margin: 0 auto 25px;
    margin-top: 50px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
}
 `]
})
export class LoginComponent implements OnInit {
  private message: string;
  private loginForm;
  private loading: boolean = false;

  constructor(private _authService: AuthService, private fb: FormBuilder, private _router: Router) {
    this.createForm();
  }

  /**
   * this is used to set our message incase there's one to our user before clearing our
   * local storage using our auth service
   */
  ngOnInit() {
    this.message = this._authService.message;
    this._authService.clear();
  }

  /**
   * we create our simple reactive form here
   */
  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * this is called when the user click on the submit button
   * and it also checks for the validity of the form , if invalid return don't do anything
   * and after authentication is successful we move to the redirectUrl if it was existing else
   * to dashboard
   */
  private submitted() {
    if (this.loginForm.invalid)
      return;

    //set our login loading indicator to show we have started the server communication
    this.loading = true;
    this._authService.authenticate(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(()=> {
        this.loading = false; //hide our loading indicator
        //navigate back to our redirect url if empty goto our dashboard
        let to: string = this._authService.getRedirectUrl() || '/dashboard';
        this._router.navigate([to]);
      }, (error)=> {
        this.loading = false;
        alert(error);
        console.error("auth error", error);
      });

  }

}
