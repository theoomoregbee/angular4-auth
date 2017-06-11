import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from "../providers/auth.service";

import 'rxjs/add/operator/mapTo';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    return this.performCheck(childRoute, state);
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.performCheck(next, state);
  }


  /**
   * this is method does the checking for us, according to the below process
   * 1. check if the user is authenticated, if so check if is time to refresh token the return the observable
   * so our guard can resolve it, since the retrieve method is already handling the response with `do` we just map this
   * to true default so next view can check and see if the new token is valid or not
   *
   * 2. if the above from 1 pass through without returning it means it was false all the way
   * so we handle it by passing a message and updating the redirectUrl so users can continue where they left of
   * after authentication
   * @param next
   * @param state
   * @returns {any}
   */
  private performCheck(next: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {

    if (this._authService.isAuthenticated()) {
      //let's check if the token will expire soon
      if (this._authService.shouldIGetToken()) {
        return this._authService.retrieveToken()
          .mapTo(true); //resolve to true since we are already handling it before now, just return true
      } else
        return true;
    }

    this._authService.setRedirectUrl(state.url);
    this._authService.message = 'Please login to continue';
    this._authService.clear();
    //navigate to login page
    this._router.navigate(['/login']);
    return false;
  }

}
