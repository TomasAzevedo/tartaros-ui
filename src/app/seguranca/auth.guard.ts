import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService,
                private router: Router) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if(this.authService.isAccessTokenInvalido()) {

            return this.authService
                .obrerNovoAccessToken()
                .then(()=>{

                    if(this.authService.isAccessTokenInvalido()) {
                        this.router.navigate(['/login']);
                        return false;
                    }

                    return true;
                });

        } else if(next.data.roles && !this.authService.temQualquerPermissao(next.data.roles)) {

            this.router.navigate(['/nao-autorizado']);
        }

        return true;
    }

}
