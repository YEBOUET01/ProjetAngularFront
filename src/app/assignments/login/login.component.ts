import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {MatCardModule} from  '@angular/material/card' ;
import { MatFormFieldModule } from '@angular/material/form-field';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, MatCardModule, MatFormFieldModule],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.authService.logIn(this.username, this.password)) {
      this.router.navigate(['home']);
    } else {
      this.errorMessage = 'Identifiant ou mot de passe incorrect';
    }
  }
}
