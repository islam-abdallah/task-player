import { AuthService } from './../services/auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
    private authService: AuthService) {
  }


  canActivate() {


    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
    return true

  }


}
