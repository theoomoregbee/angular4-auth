import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../providers/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor(private _authService: AuthService, private _router: Router) {
  }

  ngOnInit() {
  }

  /**
   * logout our user from the system
   */
  logout(): void {
    this._authService.logout()
      .subscribe((message: string) => {
        //navigate to login page
        this._router.navigate(['/login']);
      }, (error) => {
        console.error(error);
        this._authService.clear();//incase the network had issues
        this._router.navigate(['/login']);
      });
  }

}
