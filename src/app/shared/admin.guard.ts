import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  return authService.isAdmin()
    .then(isAdmin => {
      if (isAdmin) {
        console.log("ADMIN GUARD: Utilisateur admin, navigation autorisée");
        return true;
      } else {
        console.log("ADMIN GUARD: Utilisateur non admin, navigation NON autorisée");
        router.navigate(['/home']);
        return false;
      }
    });
};
