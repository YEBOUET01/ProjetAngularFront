import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // propriété pour savoir si l'utilisateur est connecté
  loggedIn = false;
  currentUser: any = null;
 
  
  private validUsers = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user', password: 'password', role: 'user' }
  ];

  constructor(private router: Router) {}

  login() {
    this.loggedIn = true;
  }

  // méthode pour connecter l'utilisateur
  logIn(username: string, password: string): boolean {
    const user = this.validUsers.find(u => u.username === username && u.password === password);
    if (user) {
      this.loggedIn = true;
      this.currentUser = user;
      return true;
    } else {
      return false;
    }
  }

  // méthode pour déconnecter l'utilisateur
  logOut() {
    this.loggedIn = false;
    this.currentUser = null;
    this.router.navigate(['/login']);
  } 

  // Méthode qui indique si on est connecté en tant qu'admin ou pas
  isAdmin(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (this.loggedIn && this.currentUser && this.currentUser.role === 'admin') {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }

  // Méthode pour vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
