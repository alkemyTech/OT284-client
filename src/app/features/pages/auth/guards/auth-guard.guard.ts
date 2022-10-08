import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let uid = localStorage.getItem('uid');
      if(uid) return true;
      else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debes estar registrado para recibir actualizaciones.'
        })
        this.router.navigate(['']);
        return false;
      }
  }
  
}
