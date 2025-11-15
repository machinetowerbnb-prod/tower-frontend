import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = () => {
  const router = inject(Router);

  const userId = localStorage.getItem('userId');

  if (userId && userId.trim() !== '') {
    return true;
  }

  // ❌ No login – redirect to signin
  router.navigate(['/signin']);
  return false;
};
