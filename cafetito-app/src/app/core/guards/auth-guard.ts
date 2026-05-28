import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from '@angular/router';

import { AuthService } from '../services/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    const token = this.authService.token;

    if (!token) {
      localStorage.setItem('redirect_after_login', state.url);
      this.router.navigate(['/login']);
      return false;
    }

    const allowedRoles = route.data['roles'];
    const currentRol = this.authService.rol;

    if (allowedRoles && !allowedRoles.includes(currentRol)) {
      localStorage.setItem('redirect_after_login', state.url);
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}