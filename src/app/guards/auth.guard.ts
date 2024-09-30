import { Inject, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  var token = localStorage.getItem('token');
  var router = inject(Router)
  if(token){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }

  
 
};
