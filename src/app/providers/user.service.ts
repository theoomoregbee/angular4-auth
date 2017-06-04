import {Injectable} from '@angular/core';
import {IUser} from "../interfaces/iuser";

@Injectable()
export class UserService {
  private user: IUser;

  constructor() {
  }

  /**
   * this is used to set our user object for current logged in user
   * @param user
   */
  set(user: IUser): void {
    this.user = user;
  }

  /**
   * this is used to get our user
   * @returns {IUser}
   */
  get(): IUser {
    return this.user;
  }

  /**
   * this is used to delete our user stored, by setting it to null
   */
  delete(): void {
    this.user = null;
  }

}
