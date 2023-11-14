import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private jwtHelper: JwtHelperService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const role = this.jwtHelper.decodeToken(token).role;

      const requiredRole = route.data['requiredRole'];

      if (role === requiredRole) {
        return true;
      } else {
        if (role === 'USER') {
          this.router.navigate(['home']);
        } else if (role === 'RESPONSABLE') {
          this.router.navigate(['admin']);
        }
      }
    } else {
      this.router.navigate(['signIn']);
    }

    return false;
  }
}
