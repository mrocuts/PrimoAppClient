import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {
  constructor(private storageService: StorageService, private router : Router ){}
  canActivate():Promise<boolean>{
    return new Promise(resolve => {
      this.storageService.get('user').then(res => {
        if(res){
          console.log(`entro al guard : ${res}`);
          resolve(true);
        } else {
          this.router.navigate(['login']);
          resolve(false);
        }
      }).catch(err => {
        resolve(false);
      })
    });
  }
  
}
