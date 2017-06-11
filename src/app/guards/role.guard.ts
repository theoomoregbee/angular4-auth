import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {UserService} from "../providers/user.service";

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private _userService: UserService) {
  }


  /**
   * this check the route if the data is existing then we move on to check if the role passed
   * from the route data is among the user roles array
   * @param next
   * @param state
   * @returns {boolean}
   */
  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (next.data == null)
      return true;

    if (next.data.role == null)
      return true;

    let user = this._userService.get();


    let allow = user.roles.indexOf(next.data.role) > -1;

    if (allow == false)
      alert("you can't go here");

    return allow;
  }
}
