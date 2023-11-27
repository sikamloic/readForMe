// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { LocalStorageService } from '../services/local-storage.service';
import { CookieStorageService } from '../services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService: CookieStorageService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    let tmp = this.cookieService.get('accessToken')
    if (tmp !== null) {
      return true;
    } else {
      return this.router.createUrlTree(['/connexion']); // Redirigez vers la page de connexion
    }
  }
}