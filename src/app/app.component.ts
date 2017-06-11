import {Component, OnInit} from '@angular/core';
import {UserService} from "./providers/user.service";
import {JwtHelper} from "./helpers/jwt-helper";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private _jwt: JwtHelper = new JwtHelper();

  constructor(private _userService: UserService) {
  }

  ngOnInit(): void {
    //let's check if there is token and we decode it and set the user
    this._userService.set(this._jwt.decodeToken());
  }
}
