import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // on injecte le service AuthService et le router
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  // On autorise l'accès à la route si l'utilisateur est connecté
  if (authService.isAuthenticated()) {
    console.log("GUARD: Utilisateur authentifié, navigation autorisée");
    return true;
  } else {
    console.log("GUARD: Utilisateur non authentifié, navigation NON autorisée");
    router.navigate(['/login']);
    return false;
  }
};
